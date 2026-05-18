<?php

namespace App\Http\Controllers;

use App\Events\MappoolSlotUpdated;
use App\Http\Requests\UpdateSlotWinConditionRequest;
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

    public function disableFreemod(MappoolSlot $slot)
    {
        $slot->update([
            'freemod_disabled' => true,
        ]);

        broadcast(new MappoolSlotUpdated($slot));

        return redirect()->back();
    }

    public function reenableFreemod(MappoolSlot $slot)
    {
        $slot->update([
            'freemod_disabled' => false,
        ]);

        broadcast(new MappoolSlotUpdated($slot));

        return redirect()->back();
    }

    public function setWinCondition(UpdateSlotWinConditionRequest $request, MappoolSlot $slot)
    {
        $slot->update($request->safe()->only('win_condition'));

        broadcast(new MappoolSlotUpdated($slot));

        return redirect()->back();
    }
}
