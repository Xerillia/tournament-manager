<?php

use App\Models\BeatmapTag;
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
        Schema::create('beatmaptag_mappoolsuggestion', function (Blueprint $table) {
            $table->foreignIdFor(BeatmapTag::class);
            $table->foreignIdFor(MappoolSuggestion::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beatmaptag_mappoolsuggestion');
    }
};
