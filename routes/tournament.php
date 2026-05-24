<?php

use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\CustomMapController;
use App\Http\Controllers\PoolingController;
use App\Http\Controllers\SuggestionCommentController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\SuggestionTagController;
use App\Http\Controllers\TournamentController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('tournaments')->name('tournaments.')->group(function () {
        // tournament
        Route::get('/create', [TournamentController::class, 'createTournament'])->name('createTournament');
        Route::post('/', [TournamentController::class, 'storeTournament'])->middleware([HandlePrecognitiveRequests::class])->name('storeTournament');
        Route::get('/{tournament}', [TournamentController::class, 'showTournament'])->name('showTournament');
        Route::get('/{tournament}/edit', [TournamentController::class, 'editTournament'])->name('editTournament');
        Route::put('/{tournament}', [TournamentController::class, 'updateTournament'])->middleware([HandlePrecognitiveRequests::class])->name('updateTournament');
        Route::delete('/{tournament}', [TournamentController::class, 'deleteTournament'])->name('deleteTournament');

        // panel
        Route::get('/{tournament}/mappools/{mappool}/panel', [PoolingController::class, 'showPoolingPanel'])->name('mappools.showPoolingPanel');

        // formats
        Route::get('/{tournament}/pooling/formats', [PoolingController::class, 'editMappoolsFormat'])->name('pooling.formats.editMappoolsFormat');
        Route::put('/{tournament}/pooling/formats', [PoolingController::class, 'updateMappoolsFormat'])->name('pooling.formats.updateMappoolsFormat');
        Route::delete('/pooling/formats/', [PoolingController::class, 'deleteMappoolsFormat'])->name('pooling.formats.deleteMappoolsFormat');

        // freemod rules
        Route::post('/pooling/freemod/rules', [PoolingController::class, 'updateFreemodRules'])->name('pooling.freemod.rules.updateFreemodRules');
        Route::post('/pooling/slots/{slot}/override', [PoolingController::class, 'overrideFreemodRules'])->name('pooling.slots.override.overrideFreemodRules');

        // custom maps
        Route::get('/{tournament}/customs', [CustomMapController::class, 'listCustomMaps'])->name('custom.listCustomMaps');
    });

    // suggestions
    Route::post('/mappools/{mappool}/', [SuggestionController::class, 'addSuggestion'])->middleware([HandlePrecognitiveRequests::class])->name('mappools.addSuggestion');
    Route::put('/suggestions/{suggestion}', [SuggestionController::class, 'updateSuggestion'])->name('suggestions.updateSuggestion');
    Route::delete('/suggestions/{suggestion}', [SuggestionController::class, 'deleteSuggestion'])->name('suggestions.deleteSuggestion');

    // comments
    Route::post('/suggestions/{suggestion}/comments', [SuggestionCommentController::class, 'postSuggestionComment'])->name('suggestions.comments.postSuggestionComment');
    Route::put('/suggestions/{suggestion}/comments/{comment:comment_id}', [SuggestionCommentController::class, 'updateSuggestionComment'])->name('suggestions.comments.updateSuggestionComment');
    Route::delete('/comments/{comment:comment_id}', [SuggestionCommentController::class, 'deleteSuggestionComment'])->name('comments.deleteSuggestionComment');

    // tags
    Route::post('/suggestions/{suggestion}/tags/{tag}', [SuggestionTagController::class, 'addTagToSuggestion'])->name('suggestions.tags.addTagToSuggestion');
    Route::delete('/suggestions/{suggestion}/tags/{tag}', [SuggestionTagController::class, 'removeTagFromSuggestion'])->name('suggestions.tags.removeTagFromSuggestion');

    // assembly
    Route::post('/suggestions/{suggestion}/slots/{slot}', [AssemblyController::class, 'insertSuggestionToSlot'])->name('slots.insertSuggestionToSlot');
    Route::delete('/slots/{slot}', [AssemblyController::class, 'removeSuggestionFromSlot'])->name('slots.removeSuggestionFromSlot');

    // toggle freemod
    Route::post('/slots/{slot}/freemod/disable', [AssemblyController::class, 'disableFreemod'])->name('slots.disableFreemod');
    Route::post('/slots/{slot}/freemod/reenable', [AssemblyController::class, 'reenableFreemod'])->name('slots.reenableFreemod');

    // win condition
    Route::patch('/slots/{slot}/win_condition', [AssemblyController::class, 'setWinCondition'])->name('slots.setWinCondition');
});
