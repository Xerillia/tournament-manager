<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'landing')->name('landing');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/discord.php';
require __DIR__.'/osu.php';
require __DIR__.'/settings.php';
require __DIR__.'/tournament.php';
