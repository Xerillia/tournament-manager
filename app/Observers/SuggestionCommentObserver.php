<?php

namespace App\Observers;

use App\Events\SuggestionCommentCreated;
use App\Events\SuggestionCommentDeleted;
use App\Models\SuggestionComment;

class SuggestionCommentObserver
{
    /**
     * Handle the SuggestionComment "created" event.
     */
    public function created(SuggestionComment $suggestionComment): void
    {
        $suggestionComment->load(['suggestion.mappool', 'comment']);

        broadcast(new SuggestionCommentCreated($suggestionComment->comment, $suggestionComment->mappool_suggestion_id, $suggestionComment->suggestion->mappool_id));
    }

    /**
     * Handle the SuggestionComment "updated" event.
     */
    public function updated(SuggestionComment $suggestionComment): void
    {
        //
    }

    /**
     * Handle the SuggestionComment "deleted" event.
     */
    public function deleted(SuggestionComment $suggestionComment): void
    {
        $suggestionComment->load(['suggestion.mappool']);
        broadcast(new SuggestionCommentDeleted($suggestionComment, $suggestionComment->suggestion->mappool_id));
    }

    /**
     * Handle the SuggestionComment "restored" event.
     */
    public function restored(SuggestionComment $suggestionComment): void
    {
        //
    }

    /**
     * Handle the SuggestionComment "force deleted" event.
     */
    public function forceDeleted(SuggestionComment $suggestionComment): void
    {
        //
    }
}
