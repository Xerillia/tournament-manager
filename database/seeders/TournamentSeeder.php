<?php

namespace Database\Seeders;

use App\Enums\Mode;
use App\Enums\TournamentStatus;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::whereOsuId(0)->first();

        DB::table('tournaments')->insert([
            'user_id' => $user->id,
            'name' => fake()->sentence(2).' Tournament',
            'caption' => fake()->sentence(8),
            'mode' => Mode::STANDARD,
            'max_rank' => 1,
            'min_rank' => 999999,
            'start_datetime' => now(),
            'end_datetime' => now()->addMonth(),
            'status' => TournamentStatus::OPEN,
            'rules' => fake()->paragraphs(3, true),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
