<?php

use App\Models\Beatmap;
use App\Models\Mappool;
use App\Models\User;
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
            $table->foreignIdFor(Beatmap::class)->constrained()->restrictOnDelete(); // the beatmap must never be deleted
            $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete(); // if the user is somehow deleted, the suggestion will stay
            $table->string('tags')->nullable();
            $table->string('notes')->nullable();
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
