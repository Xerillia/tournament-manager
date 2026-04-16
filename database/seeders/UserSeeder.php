<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'osu_id' => 0,
            'username' => 'TestUser',
            'discord' => 'TestDiscord',
            'country_code' => 'TC',
            'country_name' => 'TestCountry',
            'avatar_url' => fake()->imageUrl(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
