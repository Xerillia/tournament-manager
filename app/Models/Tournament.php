<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'name', 'caption', 'mode', 'max_rank', 'min_rank', 'start_datetime', 'end_datetime', 'win_condition', 'status', 'automatic_status_update', 'rules'])]
class Tournament extends Model
{
    use SoftDeletes;

    /**
     * Get the host of the tournament.
     */
    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the external links of the tournament.
     */
    public function links(): HasMany
    {
        return $this->hasMany(TournamentLink::class);
    }

    /**
     * Get all mappools in the tournament.
     */
    public function mappools(): HasMany
    {
        return $this->hasMany(Mappool::class);
    }
}
