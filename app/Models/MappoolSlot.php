<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['mappool_format_id', 'mappool_suggestion_id', 'slot', 'is_freemod', 'freemod_disabled'])]
#[WithoutTimestamps()]
class MappoolSlot extends Model
{
    /**
     * Get the format instance of this slot
     */
    public function format(): BelongsTo
    {
        return $this->belongsTo(MappoolFormat::class, 'mappool_format_id');
    }

    /**
     * Get the suggestion instance of this slot
     */
    public function suggestion(): BelongsTo
    {
        return $this->belongsTo(MappoolSuggestion::class, 'mappool_suggestion_id');
    }

    /**
     * Get the freemod slot of this slot if any (0...N relation)
     */
    public function freemodRules(): HasMany
    {
        return $this->hasMany(FreemodSlot::class);
    }
}
