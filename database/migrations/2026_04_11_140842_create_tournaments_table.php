<?php

use App\Enums\Gamemode;
use App\Enums\TournamentStatus;
use App\Models\User;
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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);

            $table->string('name');
            $table->tinytext('caption')->nullable();

            $table->enum('gamemode', Gamemode::cases());

            $table->integer('max_rank');
            $table->integer('min_rank');

            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');

            $table->enum('status', TournamentStatus::cases())->default(TournamentStatus::UNPUBLISHED);
            $table->boolean('automatic_status_update')->default(true);

            $table->string('forum_post')->nullable();

            $table->string('groupchat')->nullable();
            $table->string('groupchat_platform')->default('Discord');

            $table->string('livestream')->nullable();
            $table->string('livestream_platform')->default('Twitch');

            $table->string('vod')->nullable();
            $table->string('vod_platform')->default('YouTube');

            $table->text('rules')->nullable();
            $table->timestamps();

            $table->unique('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
