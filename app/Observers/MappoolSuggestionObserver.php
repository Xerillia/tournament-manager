<?php

namespace App\Observers;

use App\Events\MappoolSuggestionCreated;
use App\Events\MappoolSuggestionDeleted;
use App\Events\MappoolSuggestionEdited;
use App\Models\MappoolSuggestion;

class MappoolSuggestionObserver
{
    /**
     * Handle the MappoolSuggestion "created" event.
     */
    public function created(MappoolSuggestion $mappoolSuggestion): void
    {
        $mappoolSuggestion->load(['beatmap', 'user', 'comments', 'tags']);

        broadcast(new MappoolSuggestionCreated($mappoolSuggestion));
    }

    /**
     * Handle the MappoolSuggestion "updated" event.
     */
    public function updated(MappoolSuggestion $mappoolSuggestion): void
    {
        $mappoolSuggestion->load(['beatmap', 'user', 'comments', 'tags']);

        broadcast(new MappoolSuggestionEdited($mappoolSuggestion));
    }

    /**
     * Handle the MappoolSuggestion "deleted" event.
     */
    public function deleted(MappoolSuggestion $mappoolSuggestion): void
    {
        broadcast(new MappoolSuggestionDeleted($mappoolSuggestion));
    }
}
