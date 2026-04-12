<?php

use App\Models\Tournament;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // get all tourney
    $tournaments = Tournament::with('host')->get();

    return Inertia::render('landing', [
        'tournaments' => $tournaments,
    ]);
})->name('landing');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/discord.php';
require __DIR__.'/osu.php';
require __DIR__.'/settings.php';
require __DIR__.'/tournament.php';
