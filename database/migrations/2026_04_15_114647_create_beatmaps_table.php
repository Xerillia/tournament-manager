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
        Schema::create('beatmaps', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('beatmap_id');
            $table->unsignedInteger('beatmapset_id'); // useful for hyperlinking map
            $table->string('mode', 6); // enum(osu, mania, taiko, fruits). Validation will be through FormRequest.
            $table->string('mods')->default('NM');
            $table->float('star_rating');
            $table->float('bpm');
            $table->float('cs');
            $table->float('ar');
            $table->float('od');
            $table->float('drain');
            $table->integer('max_combo');
            $table->string('artist');
            $table->string('title');
            $table->string('version');
            $table->string('creator');
            $table->integer('creator_id'); // useful for hyperlinking mapper
            $table->timestamps();

            $table->unique(['beatmap_id', 'mods']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beatmaps');
    }
};
