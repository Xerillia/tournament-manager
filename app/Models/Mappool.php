<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['tournament_id', 'round', 'slug', 'star_rating'])]
class Mappool extends Model
{
    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Get the tournament the mappool belongs to
     */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /**
     * Get the beatmaps in a mappool
     */
    public function beatmaps(): BelongsToMany
    {
        return $this->belongsToMany(Beatmap::class)->withPivot(['slot', 'status']);
    }

    /**
     * Get the formats of the mappool
     */
    public function formats(): HasMany
    {
        return $this->hasMany(MappoolFormat::class);
    }

    /**
     * Get the suggestions for the mappool
     */
    public function suggestions(): HasMany
    {
        return $this->hasMany(MappoolSuggestion::class);
    }

    /**
     * Get the freemod rules of this mappool
     */
    public function freemodRules(): HasMany
    {
        return $this->hasMany(FreemodRule::class);
    }
}
