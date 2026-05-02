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
        ]);

        return redirect()->back();
    }

    /**
     * Update a comment in the suggestion
     */
    public function update(CommentRequest $request, MappoolSuggestion $suggestion, SuggestionComment $suggestionComment)
    {
        $validated = $request->validated();

        $comment = $suggestionComment->comment();

        $comment->update($validated);

        $suggestionComment->load(['comment.user']);
        broadcast(new SuggestionCommentEdited($suggestionComment, $suggestion->mappool_id));

        return redirect()->back();
    }

    /**
     * Delete a comment in the suggestion
     */
    public function destroy(MappoolSuggestion $suggestion, SuggestionComment $suggestionComment)
    {
        $comment = $suggestionComment->comment();

        $suggestionComment->delete();

        $comment->delete();

        return redirect()->back();
    }
}
