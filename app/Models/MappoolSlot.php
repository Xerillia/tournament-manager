<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mappool_format_id', 'mappool_suggestion_id', 'slot'])]
class MappoolSlot extends Model
{
    /**
     * Get the format instance of this slot
     */
    public function format(): BelongsTo
    {
        return $this->belongsTo(MappoolFormat::class);
    }

    /**
     * Get the suggestion instance of this slot
     */
    public function suggestion(): BelongsTo
    {
        return $this->belongsTo(MappoolSuggestion::class, 'mappool_suggestion_id');
    }
}
