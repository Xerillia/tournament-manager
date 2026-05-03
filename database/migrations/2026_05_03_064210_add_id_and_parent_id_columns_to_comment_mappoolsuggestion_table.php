<?php

use App\Models\SuggestionComment;
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
        Schema::table('comment_mappoolsuggestion', function (Blueprint $table) {
            $table->id()->first();
            $table->foreignIdFor(SuggestionComment::class, 'parent_id')->after('id')->nullable()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comment_mappoolsuggestion', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->dropColumn('parent_id');
        });
    }
};
