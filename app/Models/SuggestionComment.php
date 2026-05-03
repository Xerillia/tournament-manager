<?php

namespace App\Models;

use App\Observers\SuggestionCommentObserver;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\WithoutTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table('comment_mappoolsuggestion')]
#[Fillable(['parent_id', 'comment_id', 'mappool_suggestion_id'])]
#[ObservedBy([SuggestionCommentObserver::class])]
#[WithoutTimestamps()]
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

    /**
     * Get the replied model
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(SuggestionComment::class, 'parent_id');
    }

    /**
     * Get the comments that replies this
     */
    public function children(): HasMany
    {
        return $this->hasMany(SuggestionComment::class, 'parent_id');
    }
}
