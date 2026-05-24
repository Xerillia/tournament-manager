<?php

use App\Models\Mappool;
use App\Models\Tournament;
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
        Schema::create('custom_maps', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Tournament::class);
            $table->foreignIdFor(Mappool::class);
            $table->string('mapper');
            $table->string('beatmap_url');
            $table->string('beatmap_name');
            $table->string('mods');
            $table->string('status'); // will use Enum validation
            $table->float('bpm');
            $table->float('cs');
            $table->float('ar');
            $table->float('od');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_maps');
    }
};
