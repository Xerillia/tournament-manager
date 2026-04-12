<?php

use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::prefix('tournaments')->name('tournaments.')->group(function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('/create', [TournamentController::class, 'create'])->name('create');
        Route::post('/', [TournamentController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
    });
});
