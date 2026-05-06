<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mappool_id', 'mod', 'multiplier'])]
#[WithoutTimestamps()]
class FreemodRule extends Model
{
    /**
     * Get the mappool that has this FM rule
     */
    public function mappool(): BelongsTo
    {
        return $this->belongsTo(Mappool::class);
    }
}
