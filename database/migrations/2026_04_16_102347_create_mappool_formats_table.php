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
        Schema::create('mappool_formats', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Mappool::class)->constrained()->cascadeOnDelete();
            $table->string('slot');
            $table->integer('count');

            $table->unique(['mappool_id', 'slot']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mappool_formats');
    }
};
