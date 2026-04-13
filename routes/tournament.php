<?php

use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::prefix('tournaments')->name('tournaments.')->group(function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('/create', [TournamentController::class, 'create'])->name('create');
        Route::post('/', [TournamentController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
        Route::get('/{tournament}', [TournamentController::class, 'show'])->name('show');
        Route::get('/{tournament}/edit', [TournamentController::class, 'edit'])->name('edit');
        Route::get('/{tournament}/admin', [TournamentController::class, 'admin'])->name('admin');
        Route::get('/{tournament}/admin/players', [TournamentController::class, 'players'])->name('players');
        Route::put('/{tournament}', [TournamentController::class, 'update'])->middleware([HandlePrecognitiveRequests::class])->name('update');
        Route::delete('/{tournament}', [TournamentController::class, 'destroy'])->name('destroy');
    });
});
