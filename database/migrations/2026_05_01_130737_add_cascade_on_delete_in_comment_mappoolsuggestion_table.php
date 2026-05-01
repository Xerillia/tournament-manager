<?php

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
        Schema::table('comment_mappoolsuggestion', function (Blueprint $table) {
            $table->dropForeign('comment_id');
            $table->dropForeign('mappool_suggestion_id');
            $table->foreign('comment_id')->references('id')->on('comments')->cascadeOnDelete();
            $table->foreign('mappool_suggestion_id')->references('id')->on('mappool_suggestions')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comment_mappoolsuggestion', function (Blueprint $table) {
            $table->dropForeign('comment_id');
            $table->dropForeign('mappool_suggestion_id');
            $table->foreign('comment_id')->references('id')->on('comments');
            $table->foreign('mappool_suggestion_id')->references('id')->on('mappool_suggestions');
        });
    }
};
