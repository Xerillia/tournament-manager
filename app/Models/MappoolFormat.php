<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('mappool_formats')]
#[Fillable(['mappool_id', 'slot', 'count'])]
class MappoolFormat extends Model
{
    /**
     * Get the mappool the slot belongs to
     */
    public function mappool(): BelongsTo
    {
        return $this->belongsTo(Mappool::class);
    }
}
