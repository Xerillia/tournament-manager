<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Update a comment's message.
     */
    public function update(CommentRequest $request, Comment $comment)
    {
        $validated = $request->validated();

        $comment->update($validated);

        return redirect()->back();
    }
}
