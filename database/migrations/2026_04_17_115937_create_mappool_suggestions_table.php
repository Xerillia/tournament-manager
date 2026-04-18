<?php

use App\Models\Beatmap;
use App\Models\Mappool;
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
        Schema::create('mappool_suggestions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Mappool::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Beatmap::class)->constrained()->restrictOnDelete();
            $table->string('mods');
            $table->string('tags')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mappool_suggestions');
    }
};
