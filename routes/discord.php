<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Socialite;

Route::group(['prefix' => config('discord.route_prefix'), 'middleware' => ['auth']], function () {
    Route::get('/link', function () {
        return Inertia::location(Socialite::driver('discord')->redirect());
    })->name('discord.link');

    Route::get('/callback', function () {
        $discord = Socialite::driver('discord')->user();

        $user = Auth::user();

        $user->updateOrFail(['discord' => $discord->name]);

        return redirect()->intended(config('discord.redirect_login', '/'));
    })->name('discord.callback');

    Route::post('/unlink', function () {
        $user = Auth::user();

        $user->updateorFail(['discord' => null]);

        return redirect()->intended(config('discord.redirect_login', '/'));
    })->name('discord.unlink');
});
