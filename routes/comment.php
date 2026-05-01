<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::prefix('comments')->name('comments.')->group(function () {
    Route::put('/{comment}', [CommentController::class, 'update'])->name('updateComment');
});
