<?php

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
            $table->foreignIdFor(Mappool::class)->nullable()->constrained()->nullOnDelete();
            $table->unsignedInteger('beatmap_id');
            $table->string('mods');
            $table->string('tags')->nullable();
            $table->timestamps();

            $table->foreign(['beatmap_id', 'mods'])->references(['beatmap_id', 'mods'])->on('beatmaps')->onDelete('restrict');
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
