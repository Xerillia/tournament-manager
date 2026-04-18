<?php

use App\Enums\Mode;
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
        Schema::table('tournaments', function (Blueprint $table) {
            $table->renameColumn('gamemode', 'mode');
            $table->string('mode', 6)->default('osu')->change(); // enum(osu, mania, taiko, fruits). Validation will be through FormRequest.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tournaments', function (Blueprint $table) {
            $table->renameColumn('mode', 'gamemode');
            $table->enum('gamemode', Mode::cases())->change();
        });
    }
};
