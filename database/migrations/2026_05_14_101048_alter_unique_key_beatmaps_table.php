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
        Schema::table('beatmaps', function (Blueprint $table) {
            $table->dropUnique(['beatmap_id', 'mods']);
            $table->unique(['beatmap_id', 'mods', 'mode']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beatmaps', function (Blueprint $table) {
            $table->dropUnique(['beatmap_id', 'mods', 'mode']);
            $table->unique(['beatmap_id', 'mods']);
        });
    }
};
