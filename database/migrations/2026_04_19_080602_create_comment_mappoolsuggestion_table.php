<?php

use App\Models\Comment;
use App\Models\MappoolSuggestion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comment_mappoolsuggestion', function (Blueprint $table) {
            $table->foreignIdFor(Comment::class);
            $table->foreignIdFor(MappoolSuggestion::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_mappoolsuggestion');
    }
};
