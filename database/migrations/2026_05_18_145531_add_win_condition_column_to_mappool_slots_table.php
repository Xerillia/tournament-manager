<?php

use App\Enums\WinCondition;
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
        Schema::table('mappool_slots', function (Blueprint $table) {
            $table->string('win_condition')->after('slot')->default(WinCondition::SCORE_V2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mappool_slots', function (Blueprint $table) {
            $table->dropColumn('win_condition');
        });
    }
};
