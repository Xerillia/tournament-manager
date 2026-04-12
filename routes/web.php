<?php

use App\Enums\TournamentStatus;
use App\Models\Tournament;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // get all tourney
    $tournaments = Tournament::where('status', '!=', TournamentStatus::UNPUBLISHED)->with('host')->get();

    $ownTournaments = [];
    if (Auth::check()) {
        $ownTournaments = Tournament::where('user_id', '=', Auth::id())->get();
    }

    return Inertia::render('landing', [
        'tournaments' => $tournaments,
        'ownTournaments' => $ownTournaments,
    ]);
})->name('landing');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/discord.php';
require __DIR__.'/osu.php';
require __DIR__.'/settings.php';
require __DIR__.'/tournament.php';
