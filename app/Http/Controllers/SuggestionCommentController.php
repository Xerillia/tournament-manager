<?php

namespace App\Http\Controllers;

use App\Events\SuggestionCommentEdited;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\MappoolSuggestion;
use App\Models\SuggestionComment;
use Illuminate\Support\Facades\Auth;

class SuggestionCommentController extends Controller
{
    /**
     * Store a new comment in a suggestion
     */
    public function store(CommentRequest $request, MappoolSuggestion $suggestion)
    {
        $validated = $request->safe()->merge(['user_id' => Auth::id()])->all();

        $comment = Comment::create($validated);

        SuggestionComment::create([
            'comment_id' => $comment->id,
            'mappool_suggestion_id' => $suggestion->id,
            'parent_id' => array_key_exists('parent_id', $validated) ? $validated['parent_id'] : null,
        ]);

        return redirect()->back();
    }

    /**
     * Update a comment in the suggestion
     */
    public function update(CommentRequest $request, MappoolSuggestion $suggestion, SuggestionComment $comment)
    {
        $validated = $request->validated();

        $base = $comment->comment();

        $base->update($validated);

        $comment->load(['comment.user']);
        broadcast(new SuggestionCommentEdited($comment, $suggestion->mappool_id));

        return redirect()->back();
    }

    /**
     * Delete a comment in the suggestion
     */
    public function destroy(MappoolSuggestion $suggestion, SuggestionComment $comment)
    {
        $base = $comment->comment();

        $comment->delete();

        $base->delete();

        return redirect()->back();
    }
}
