<?php

namespace Database\Seeders;

use App\Models\Mappool;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MappoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::whereOsuId(0)->first();
        $tournament = Tournament::whereUserId($user->id)->first();

        DB::table('mappools')->insert([
            [
                'tournament_id' => $tournament->id,
                'round' => 'Quarterfinals',
                'slug' => 'quarterfinals',
                'star_rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tournament_id' => $tournament->id,
                'round' => 'Semifinals',
                'slug' => 'semifinals',
                'star_rating' => 5.2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tournament_id' => $tournament->id,
                'round' => 'Finals',
                'slug' => 'finals',
                'star_rating' => 5.4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tournament_id' => $tournament->id,
                'round' => 'Grand Finals',
                'slug' => 'grand-finals',
                'star_rating' => 5.6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $mappool = Mappool::first();

        DB::table('mappool_formats')->insert([
            [
                'mappool_id' => $mappool->id,
                'slot' => 'NM',
                'count' => 4,
            ],
            [
                'mappool_id' => $mappool->id,
                'slot' => 'HD',
                'count' => 2,
            ],
            [
                'mappool_id' => $mappool->id,
                'slot' => 'HR',
                'count' => 2,
            ],
            [
                'mappool_id' => $mappool->id,
                'slot' => 'DT',
                'count' => 2,
            ],
            [
                'mappool_id' => $mappool->id,
                'slot' => 'FM',
                'count' => 2,
            ],
            [
                'mappool_id' => $mappool->id,
                'slot' => 'TB',
                'count' => 1,
            ],
        ]);
    }
}
