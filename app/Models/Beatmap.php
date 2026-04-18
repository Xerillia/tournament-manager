<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * Get the suggestions the beatmap is in
     */
    public function suggestions(): HasMany
    {
        return $this->hasMany(MappoolSuggestion::class)->chaperone();
    }
}
