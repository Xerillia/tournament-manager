<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['tournament_id', 'round'])]
class Mappool extends Model
{
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
        return $this->belongsToMany(Beatmap::class)->withPivot(['round', 'slot', 'status']);
    }

    /**
     * Get the formats of the mappool
     */
    public function formats(): HasMany
    {
        return $this->hasMany(MappoolFormat::class);
    }
}
