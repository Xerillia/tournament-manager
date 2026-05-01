<?php

namespace App\Http\Controllers;

use App\Events\SuggestionCommentCreated;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\MappoolSuggestion;
use App\Models\SuggestionComment;
use Illuminate\Support\Facades\Auth;

class SuggestionCommentController extends Controller
{
    /**
     * Show a specific suggestion's comments
     */
    public function store(CommentRequest $request, MappoolSuggestion $suggestion)
    {
        $validated = $request->safe()->merge(['user_id' => Auth::id()])->all();

        $comment = Comment::create($validated);

        SuggestionComment::create([
            'comment_id' => $comment->id,
            'mappool_suggestion_id' => $suggestion->id,
        ]);

        broadcast(new SuggestionCommentCreated($comment, $suggestion->mappool_id))->toOthers();

        return redirect()->back();
    }
}
