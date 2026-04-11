<?php

namespace App\Services;

use App\Models\User;
use App\Types\AccessToken;
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class OsuService
{
    /**
     * osu! OAuth token URL
     */
    protected string $tokenURL = 'https://osu.ppy.sh/oauth/token';

    /**
     * osu! API base URL
     */
    protected string $baseApi = 'https://osu.ppy.sh/api/v2';

    /**
     * Required data for token request
     */
    protected array $tokenData = [
        'client_id' => null,
        'redirect uri' => null,
        'response_type' => null,
        'scope' => null,
        'state' => null,
    ];

    /**
     * OsuService constructor
     */
    public function __construct()
    {
        $this->tokenData['client_id'] = config('osu.client_id');
        $this->tokenData['client_secret'] = config('osu.client_secret');
        $this->tokenData['redirect_uri'] = config('osu.redirect_uri');
        $this->tokenData['scope'] = config('osu.scope');
    }

    /**
     * Handles the osu OAuth2 callback and returns the access token.
     *
     * @throws RequestException
     */
    public function getAccessTokenFromCode(string $code): AccessToken
    {
        $tokenData = [
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
            'redirect_uri' => config('osu.redirect_uri'),
        ];

        $response = Http::asForm()->post($this->tokenURL, $tokenData);

        $response->throw();

        return new AccessToken(json_decode($response->body()));
    }

    /**
     * Get access token from refresh token.
     *
     * @throws RequestException
     */
    public function refreshAccessToken(string $refreshToken): AccessToken
    {
        $response = Http::asForm()->post($this->tokenURL, [
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
        ]);

        $response->throw();

        return new AccessToken(json_decode($response->body()));
    }

    /**
     * Authenticate user with access token then return the data
     *
     * @throws RequestException
     */
    public function getCurrentUser(AccessToken $accessToken): \App\Types\User
    {
        $response = Http::withToken($accessToken->access_token)->get($this->baseApi.'/me');

        $response->throw();

        return new \App\Types\User(json_decode($response->body()));
    }

    /**
     * Create or update user in the database
     *
     * @throws Exception
     */
    public function createOrUpdateUser(\App\Types\User $user): User
    {
        if (! $user->getAccessToken()) {
            throw new Exception('User access token is missing.');
        }

        return User::updateOrCreate(
            [
                'osu_id' => $user->id,
                'country_code' => $user->country->code,
                'country_name' => $user->country->name,
                'avatar_url' => $user->avatar_url,
            ],
            $user->toArray(),
        );
    }

    /**
     * Revoke user's access token
     *
     * @throws RequestException
     */
    public function revokeAccessToken(string $accessToken): object
    {
        $response = Http::asForm()->post($this->tokenURL.'/oauth/tokens/current', [
            'token' => $accessToken,
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
        ]);

        $response->throw();

        return json_decode($response->body());
    }
}
