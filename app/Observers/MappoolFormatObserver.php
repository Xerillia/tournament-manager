<?php

namespace App\Observers;

use App\Models\MappoolFormat;
use App\Models\MappoolSlot;

class MappoolFormatObserver
{
    /**
     * Handle the MappoolFormat "created" event.
     */
    public function created(MappoolFormat $mappoolFormat): void
    {
        for ($i = 1; $i <= $mappoolFormat->count; $i++) {
            MappoolSlot::create([
                'mappool_format_id' => $mappoolFormat->id,
                'slot' => $mappoolFormat->slot.($i),
            ]);
        }
    }

    /**
     * Handle the MappoolFormat "updated" event.
     */
    public function updated(MappoolFormat $mappoolFormat): void
    {
        $slots = MappoolSlot::whereMappoolFormatId($mappoolFormat->id)->get();

        $number = 1;
        while ($number <= count($slots) || $number <= $mappoolFormat->count) {
            // update the slot
            if ($number <= count($slots) && $number <= $mappoolFormat->count) {
                $slot = $slots[$number - 1];
                $slot->update([
                    'slot' => $mappoolFormat->slot.($number++),
                ]);
            }

            // add new slots
            elseif ($number > count($slots) && $number <= $mappoolFormat->count) {
                MappoolSlot::create([
                    'mappool_format_id' => $mappoolFormat->id,
                    'slot' => $mappoolFormat->slot.($number++),
                ]);
            }

            // remove slots
            else {
                $slot = $slots[$number - 1];
                $slot->delete();
                $number++;
            }
        }
    }
}
