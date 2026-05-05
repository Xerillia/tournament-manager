<?php

use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\PoolingController;
use App\Http\Controllers\SuggestionCommentController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('tournaments')->name('tournaments.')->group(function () {

        Route::get('/create', [TournamentController::class, 'createTournament'])->name('createTournament');
        Route::post('/', [TournamentController::class, 'storeTournament'])->middleware([HandlePrecognitiveRequests::class])->name('storeTournament');
        Route::get('/{tournament}', [TournamentController::class, 'showTournament'])->name('showTournament');
        Route::get('/{tournament}/edit', [TournamentController::class, 'editTournament'])->name('editTournament');
        Route::put('/{tournament}', [TournamentController::class, 'updateTournament'])->middleware([HandlePrecognitiveRequests::class])->name('updateTournament');
        Route::delete('/{tournament}', [TournamentController::class, 'deleteTournament'])->name('deleteTournament');

        Route::get('/{tournament}/mappools/{mappool}/panel', [PoolingController::class, 'showPoolingPanel'])->name('mappools.showPoolingPanel');

        Route::prefix('{tournament}/pooling/')->name('pooling.')->group(function () {
            Route::get('/', [PoolingController::class, 'index'])->name('index');
            Route::put('/', [PoolingController::class, 'update'])->name('update');
            Route::delete('/', [PoolingController::class, 'destroy'])->name('destroy');
        });
    });

    // suggestions
    Route::post('/mappools/{mappool}/', [SuggestionController::class, 'addSuggestion'])->name('mappools.addSuggestion');
    Route::put('/suggestions/{suggestion}', [SuggestionController::class, 'updateSuggestion'])->name('suggestions.updateSuggestion');
    Route::delete('/suggestions/{suggestion}', [SuggestionController::class, 'deleteSuggestion'])->name('suggestions.deleteSuggestion');

});

Route::prefix('{suggestion}/comments')->name('suggestions.comments.')->group(function () {
    Route::post('/', [SuggestionCommentController::class, 'store'])->name('store');
    Route::put('/{comment:comment_id}', [SuggestionCommentController::class, 'update'])->name('updateSuggestionComment');
    Route::delete('/{comment:comment_id}', [SuggestionCommentController::class, 'destroy'])->name('deleteSuggestionComment');
});

Route::prefix('{suggestion}/tags')->name('tags.')->group(function () {
    Route::post('/{tag}', [SuggestionController::class, 'addTag'])->name('addTagToSuggestion');
    Route::delete('/{tag}', [SuggestionController::class, 'removeTag'])->name('removeTagFromSuggestion');
});

Route::post('suggestion/{suggestion}/to/slot/{slot}', [AssemblyController::class, 'insertSuggestionToSlot'])->name('suggestion.slot.insertSuggestionToSlot');
Route::delete('slot/{slot}', [AssemblyController::class, 'removeSuggestionFromSlot'])->name('slot.removeSuggestionFromSlot');
