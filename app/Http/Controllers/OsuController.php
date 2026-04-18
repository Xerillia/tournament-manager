<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Services\OsuService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class OsuController extends Controller
{
    /**
     * Handles osu OAuth2 login
     */
    public function handle(StoreUserRequest $request): RedirectResponse|JsonResponse
    {
        // get accessToken from osu api
        try {
            $accessToken = (new OsuService)->getAccessTokenFromCode($request->input('code'));
        } catch (\Exception $e) {
            return $this->throwError('invalid_code', $e);
        }

        // Get the user from the osu api
        try {
            $user = (new OsuService)->getCurrentUser($accessToken);
            $user->setAccessToken($accessToken);
        } catch (\Exception $e) {
            return $this->throwError('authorization_failed', $e);
        }

        if (Auth::check()) {
            // Making sure the current logged-in user's ID is matching the ID retrieved from the osu API
            if (Auth::id() !== (int) $user->id) {
                Auth::logout();

                return $this->throwError('invalid_user', null);
            }
        }

        // Trying to create or update the user in the database
        // Initiating a database transaction in case something goes wrong
        DB::beginTransaction();
        try {
            $user = (new OsuService)->createOrUpdateUser($user);
            $user->accessToken()->updateOrCreate([], $accessToken->toArray());
        } catch (\Exception $e) {
            DB::rollBack();

            return $this->throwError('database_error', $e);
        }

        // Verifying if the user is soft-deleted.
        if (Schema::hasColumn('users', 'deleted_at')) {
            if ($user->trashed()) {
                DB::rollBack();

                return $this->throwError('user_deleted', null);
            }
        }

        // Committing the transaction
        DB::commit();

        // Authenticating the user if the user is not logged in
        if (! Auth::check()) {
            Auth::login($user, config('osu.remember_me', false));
        }

        // Redirecting the user to the intended page or to the home page
        return redirect()->intended(config('osu.redirect_login', '/'));
    }

    /**
     * Handles error throwing
     */
    private function throwError(string $message, ?\Exception $exception): RedirectResponse|JsonResponse
    {
        if (app()->hasDebugModeEnabled()) {
            return response()->json([
                'osu_message' => config('osu.error_messages.'.$message),
                'message' => $exception?->getMessage(),
                'code' => $exception?->getCode(),
            ]);
        } else {
            if (config('osu.error_messages.'.$message.'.redirect')) {
                return redirect(config('osu.error_messages.'.$message.'.redirect'))->with('error', config('osu.error_messages.'.$message.'.message', 'An error occurred while trying to log you in.'));
            } else {
                return redirect('/')->with('error', config('osu.error_messages.'.$message, 'An error occurred while trying to log you in.'));
            }
        }
    }

    /**
     * Handles logging out
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();

        return redirect()->route('landing');
    }
}
