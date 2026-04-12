<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['user_id', 'name', 'caption', 'gamemode', 'max_rank', 'min_rank', 'start_datetime',
    'end_datetime', 'status', 'automatic_status_update', 'forum_post', 'groupchat',
    'groupchat_platform', 'livestream', 'livestream_platform', 'vod', 'vod_platform',
    'rules'])]
class Tournament extends Model
{
    /**
     * Get the founder of the tournament.
     */
    public function founder(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
