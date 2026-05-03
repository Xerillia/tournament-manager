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
        $suggestionComment->load(['suggestion.mappool', 'comment.user']);
        broadcast(new SuggestionCommentCreated($suggestionComment, $suggestionComment->suggestion->mappool_id));
    }

    /**
     * Handle the SuggestionComment "deleted" event.
     */
    public function deleted(SuggestionComment $suggestionComment): void
    {
        $suggestionComment->load(['suggestion.mappool']);
        broadcast(new SuggestionCommentDeleted($suggestionComment, $suggestionComment->suggestion->mappool_id));
    }
}
