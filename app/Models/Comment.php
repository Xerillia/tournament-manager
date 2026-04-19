<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'message'])]
class Comment extends Model
{
    /**
     * Get the user that made this comment
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
