<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable('name')]
#[WithoutTimestamps]
class BeatmapTag extends Model
{
    /**
     * Get the suggestions this tag is in
     */
    public function suggestions(): BelongsToMany
    {
        return $this->belongsToMany(MappoolSuggestion::class, 'beatmaptag_mappoolsuggestion');
    }
}
