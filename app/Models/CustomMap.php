<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mappool_id', 'mapper', 'beatmap_url', 'beatmap_name', 'mods', 'status', 'bpm', 'cs', 'ar', 'od'])]
class CustomMap extends Model
{
    /**
     * Get the mappool of this custom map
     */
    public function mappool(): BelongsTo
    {
        return $this->belongsTo(Mappool::class);
    }
}
