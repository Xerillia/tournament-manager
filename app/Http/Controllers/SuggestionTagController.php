<?php

namespace App\Http\Controllers;

use App\Events\MappoolSuggestionTagAdded;
use App\Events\MappoolSuggestionTagRemoved;
use App\Models\BeatmapTag;
use App\Models\MappoolSuggestion;

class SuggestionTagController extends Controller
{
    public function addTagToSuggestion(BeatmapTag $tag, MappoolSuggestion $suggestion)
    {
        $suggestion->tags()->attach($tag->id);

        broadcast(new MappoolSuggestionTagAdded($tag, $suggestion, $suggestion->mappool_id));

        return redirect()->back();
    }

    public function removeTagFromSuggestion(BeatmapTag $tag, MappoolSuggestion $suggestion)
    {
        $suggestion->tags()->detach($tag->id);

        broadcast(new MappoolSuggestionTagRemoved($tag, $suggestion, $suggestion->mappool_id));

        return redirect()->back();
    }
}
