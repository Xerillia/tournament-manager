<?php

use App\Http\Controllers\OsuController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::location('https://osu.ppy.sh/oauth/authorize?client_id='.config('osu.client_id')
    .'&redirect_uri='.config('osu.redirect_uri')
    .'&response_type=code&scope='.config('osu.scope'));
})
    ->middleware(['guest'])
    ->name('osu.login');

Route::group(['prefix' => config('osu.route_prefix', 'osu')], function () {
    Route::get('/callback', [OsuController::class, 'handle'])
        ->name('osu.callback');

    Route::redirect('/refresh-token', 'https://osu.ppy.sh/oauth/authorize?client_id='.config('osu.client_id')
        .'&redirect_uri='.config('osu.redirect_uri')
         .'&response_type=code&scope='.config('osu.scope'))
        ->middleware(['auth'])
        ->name('osu.refresh_token');

    Route::post('/logout', [OsuController::class, 'logout'])
        ->name('osu.logout');
});
