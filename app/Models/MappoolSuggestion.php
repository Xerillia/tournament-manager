<?php

namespace App\Models;

use App\Observers\MappoolSuggestionObserver;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['mappool_id', 'beatmap_id', 'user_id', 'tags'])]
#[ObservedBy(MappoolSuggestionObserver::class)]
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
        return $this->belongsTo(Beatmap::class);
    }

    /**
     * Get the user who made this suggestion
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the comments of this suggestion
     */
    public function comments(): HasMany
    {
        return $this->hasMany(SuggestionComment::class);
    }

    /**
     * Get the tags of this suggestion
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(BeatmapTag::class, 'beatmaptag_mappoolsuggestion');
    }

    /**
     * Get the slot of this suggestion
     */
    public function slot(): HasOne
    {
        return $this->hasOne(MappoolSlot::class, 'mappool_suggestion_id');
    }
}
