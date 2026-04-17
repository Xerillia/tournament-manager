<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mappool_id', 'beatmap_id', 'mods', 'tags'])]
class MappoolSuggestion extends Model
{
    /**
     * Get the mappool this suggestion belongs to
     */
    public function mappool(): BelongsTo
    {
        return $this->belongsTo(Mappool::class);
    }

    /**
     * Get the beatmap of this suggestion
     */
    public function beatmap(): BelongsTo
    {
        return $this->belongsTo(Beatmap::class, 'beatmap_id', 'beatmap_id');
    }
}
