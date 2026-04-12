<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'name', 'caption', 'gamemode', 'max_rank', 'min_rank', 'start_datetime',
    'end_datetime', 'status', 'automatic_status_update', 'forum_post', 'groupchat',
    'groupchat_platform', 'livestream', 'livestream_platform', 'vod', 'vod_platform',
    'rules'])]
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
     * Get the players of the tournament.
     */
    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class);
    }
}
