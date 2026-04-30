<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('comment_mappoolsuggestion')]
#[Fillable(['comment_id', 'mappool_suggestion_id'])]
class SuggestionComment extends Model
{
    /**
     * Get the suggestion the comment is in
     */
    public function suggestion(): BelongsTo
    {
        return $this->belongsTo(MappoolSuggestion::class);
    }

    /**
     * Get the comment model
     */
    public function comment(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }
}
