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
        Schema::create('beatmap_mappool', function (Blueprint $table) {
            $table->foreignIdFor(Mappool::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Beatmap::class)->constrained()->cascadeOnDelete();
            $table->string('round');
            $table->string('slot');
            $table->string('status')->default('suggested'); // suggested, drafted, pooled
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beatmap_mappool');
    }
};
