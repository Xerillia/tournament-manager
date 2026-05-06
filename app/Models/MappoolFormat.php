<?php

namespace App\Models;

use App\Observers\MappoolFormatObserver;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table('mappool_formats')]
#[Fillable(['mappool_id', 'slot', 'count', 'is_freemod'])]
#[ObservedBy(MappoolFormatObserver::class)]
#[WithoutTimestamps]
class MappoolFormat extends Model
{
    /**
     * Get the mappool the format belongs to
     */
    public function mappool(): BelongsTo
    {
        return $this->belongsTo(Mappool::class);
    }

    /**
     * Get the slots of this format
     */
    public function slots(): HasMany
    {
        return $this->hasMany(MappoolSlot::class);
    }
}
