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
        Schema::table('tournaments', function (Blueprint $table) {
            $table->dropColumn('forum_post');
            $table->dropColumn('groupchat');
            $table->dropColumn('groupchat_platform');
            $table->dropColumn('livestream');
            $table->dropColumn('livestream_platform');
            $table->dropColumn('vod');
            $table->dropColumn('vod_platform');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            $table->string('forum_post')->nullable();

            $table->string('groupchat')->nullable();
            $table->string('groupchat_platform')->default('Discord');

            $table->string('livestream')->nullable();
            $table->string('livestream_platform')->default('Twitch');

            $table->string('vod')->nullable();
            $table->string('vod_platform')->default('YouTube');
        });
    }
};
