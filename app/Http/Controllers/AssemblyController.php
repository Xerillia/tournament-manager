<?php

namespace App\Http\Controllers;

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

        return redirect()->back();
    }
}
