<?php

use App\Models\MappoolFormat;
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
        Schema::create('mappool_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(MappoolFormat::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(MappoolSuggestion::class)->nullable()->constrained()->restrictOnDelete();
            $table->string('slot'); // Controlled by MappoolFormatObserver
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mappool_slots');
    }
};
