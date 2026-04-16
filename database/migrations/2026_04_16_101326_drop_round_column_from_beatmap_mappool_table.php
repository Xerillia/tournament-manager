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
        Schema::table('beatmap_mappool', function (Blueprint $table) {
            $table->dropColumn('round');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beatmap_mappool', function (Blueprint $table) {
            $table->string('round')->after('beatmap_id');
        });
    }
};
