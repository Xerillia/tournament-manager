<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['beatmap_id', 'beatmapset_id', 'mode', 'mods', 'star_rating', 'bpm', 'cs', 'ar', 'od', 'drain', 'max_combo', 'artist', 'title', 'version', 'creator', 'creator_id'])]
class Beatmap extends Model
{
    /**
     * Get the mappools the beatmap is in
     */
    public function mappools(): BelongsToMany
    {
        return $this->belongsToMany(Mappool::class)->withPivot(['slot', 'status']);
    }
}
