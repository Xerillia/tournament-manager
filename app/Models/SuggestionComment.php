<?php

namespace App\Models;

use App\Observers\SuggestionCommentObserver;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\WithoutIncrementing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('comment_mappoolsuggestion', key: 'comment_id')]
#[Fillable(['comment_id', 'mappool_suggestion_id'])]
#[ObservedBy([SuggestionCommentObserver::class])]
#[WithoutIncrementing()]
class SuggestionComment extends Model
{
    /**
     * Get the suggestion the comment is in
     */
    public function suggestion(): BelongsTo
    {
        return $this->belongsTo(MappoolSuggestion::class, 'mappool_suggestion_id');
    }

    /**
     * Get the comment model
     */
    public function comment(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }
}
