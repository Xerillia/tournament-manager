<?php

use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\PoolingController;
use App\Http\Controllers\SuggestionCommentController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\SuggestionTagController;
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

    // comments
    Route::post('/suggestions/{suggestion}/comments', [SuggestionCommentController::class, 'postSuggestionComment'])->name('suggestions.comments.postSuggestionComment');
    Route::put('/suggestions/{suggestion}/comments/{comment:comment_id}', [SuggestionCommentController::class, 'updateSuggestionComment'])->name('suggestions.comments.updateSuggestionComment');
    Route::delete('/comments/{comment:comment_id}', [SuggestionCommentController::class, 'deleteSuggestionComment'])->name('comments.deleteSuggestionComment');

    // tags
    Route::post('/suggestions/{suggestion}/tags/{tag}', [SuggestionTagController::class, 'addTagToSuggestion'])->name('suggestions.tags.addTagToSuggestion');
    Route::delete('/suggestions/{suggestion}/tags/{tag}', [SuggestionTagController::class, 'removeTagFromSuggestion'])->name('suggestions.tags.removeTagFromSuggestion');
});

Route::post('suggestion/{suggestion}/to/slot/{slot}', [AssemblyController::class, 'insertSuggestionToSlot'])->name('suggestion.slot.insertSuggestionToSlot');
Route::delete('slot/{slot}', [AssemblyController::class, 'removeSuggestionFromSlot'])->name('slot.removeSuggestionFromSlot');
