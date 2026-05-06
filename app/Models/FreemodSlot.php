<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mappool_slot_id', 'mod', 'multiplier'])]
#[WithoutTimestamps()]
class FreemodSlot extends Model
{
    /**
     * Get the actual slot of this model
     */
    public function slot(): BelongsTo
    {
        return $this->belongsTo(MappoolSlot::class);
    }
}
