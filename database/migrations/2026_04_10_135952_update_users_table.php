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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('osu_id')->after('id');
            $table->string('username')->after('osu_id');
            $table->string('country_code', 2)->after('username');
            $table->string('country_name')->after('country_code');
            $table->string('avatar_url')->after('country_name');

            $table->unique('osu_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('osu_id');
            $table->dropColumn('username');
            $table->dropColumn('country_code');
            $table->dropColumn('country_name');
            $table->dropColumn('avatar_url');
        });
    }
};
