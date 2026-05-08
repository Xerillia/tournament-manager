<?php

namespace App\Http\Controllers;

use App\Events\MappoolSlotUpdated;
use App\Models\MappoolSlot;
use App\Models\MappoolSuggestion;

class AssemblyController extends Controller
{
    /**
     * Insert a suggestion into a slot.
     */
    public function insertSuggestionToSlot(MappoolSuggestion $suggestion, MappoolSlot $slot)
    {
        $slot->update([
            'mappool_suggestion_id' => $suggestion->id,
        ]);

        broadcast(new MappoolSlotUpdated($slot));

        return redirect()->back();
    }

    /**
     * Remove a suggestion from a slot.
     */
    public function removeSuggestionFromSlot(MappoolSlot $slot)
    {
        $slot->update([
            'mappool_suggestion_id' => null,
        ]);

        broadcast(new MappoolSlotUpdated($slot));

        return redirect()->back();
    }
}
