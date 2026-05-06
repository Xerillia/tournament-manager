<?php

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
        Schema::table('mappool_formats', function (Blueprint $table) {
            $table->boolean('is_freemod')->after('count')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mappool_formats', function (Blueprint $table) {
            $table->dropColumn('is_freemod');
        });
    }
};
