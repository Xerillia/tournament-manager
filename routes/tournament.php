<?php

use App\Http\Controllers\PoolingController;
use App\Http\Controllers\SuggestionCommentController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::prefix('tournaments')->name('tournaments.')->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('/create', [TournamentController::class, 'create'])->name('create');
        Route::post('/', [TournamentController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
        Route::get('/{tournament}', [TournamentController::class, 'show'])->name('show');
        Route::get('/{tournament}/edit', [TournamentController::class, 'edit'])->name('edit');
        Route::put('/{tournament}', [TournamentController::class, 'update'])->middleware([HandlePrecognitiveRequests::class])->name('update');
        Route::delete('/{tournament}', [TournamentController::class, 'destroy'])->name('destroy');

        Route::prefix('{tournament}/suggestions')->name('suggestions.')->group(function () {
            Route::get('/{round}', [SuggestionController::class, 'index'])->name('index');
            Route::post('/', [SuggestionController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
            Route::put('/{suggestion}', [SuggestionController::class, 'update'])->name('update');
            Route::delete('/{suggestion}', [SuggestionController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('{tournament}/pooling/')->name('pooling.')->group(function () {
            Route::get('/', [PoolingController::class, 'index'])->name('index');
            Route::put('/', [PoolingController::class, 'update'])->name('update');
            Route::delete('/', [PoolingController::class, 'destroy'])->name('destroy');
        });
    });
});

Route::prefix('{suggestion}/comments')->name('suggestions.comments.')->group(function () {
    Route::post('/', [SuggestionCommentController::class, 'store'])->name('store');
    Route::put('/{comment:comment_id}', [SuggestionCommentController::class, 'update'])->name('updateSuggestionComment');
    Route::delete('/{comment:comment_id}', [SuggestionCommentController::class, 'destroy'])->name('deleteSuggestionComment');
});
