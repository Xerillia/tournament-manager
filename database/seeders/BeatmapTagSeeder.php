<?php

namespace Database\Seeders;

use App\Models\BeatmapTag;
use Illuminate\Database\Seeder;

class BeatmapTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            // slots
            ['name' => 'NM1'],
            ['name' => 'NM2'],
            ['name' => 'NM3'],
            ['name' => 'NM4'],
            ['name' => 'NM5'],
            ['name' => 'NM6'],
            ['name' => 'HD1'],
            ['name' => 'HD2'],
            ['name' => 'HD3'],
            ['name' => 'HR1'],
            ['name' => 'HR2'],
            ['name' => 'HR3'],
            ['name' => 'DT1'],
            ['name' => 'DT2'],
            ['name' => 'DT3'],
            ['name' => 'DT4'],
            ['name' => 'FM1'],
            ['name' => 'FM2'],
            ['name' => 'FM3'],
            ['name' => 'TB'],

            // Aim
            ['name' => 'Jump Aim'],
            ['name' => 'Awkward Aim'],
            ['name' => 'Linear Aim'],
            ['name' => 'Speed Aim'],
            ['name' => 'Snap Aim'],
            ['name' => 'Mixed Aim'],

            // Tapping
            ['name' => 'Streams'],
            ['name' => 'Death Streams'],
            ['name' => 'Hybrid Tapping'],
            ['name' => 'High BPM Finger Ctrl'],
            ['name' => 'Stamina'],
            ['name' => 'Speed'],
            ['name' => 'Bursts'],

            // Control
            ['name' => 'Alt'],
            ['name' => 'Snap Alt'],
            ['name' => 'Flow Alt'],
            ['name' => 'Aim Control'],
            ['name' => 'Flow Control'],
            ['name' => 'Rhythm'],
            ['name' => 'Low BPM Finger Ctrl'],
            ['name' => 'Flow Aim'],

            // Technical
            ['name' => 'Tech'],
            ['name' => 'Slider Aim'],
            ['name' => 'Control Tech'],
            ['name' => 'Swing'],
            ['name' => 'Alt-Tech'],
            ['name' => 'Chinese Tech'],
            ['name' => 'Stream/Flow Tech'],
            ['name' => 'Light Tech'],
            ['name' => 'Mech Tech'],

            // Gimmick
            ['name' => 'Gimmick'],
            ['name' => 'Antimod'],
            ['name' => 'Precision'],
            ['name' => 'Structural Reading'],
            ['name' => 'Low AR Reading'],
            ['name' => 'High AR Reading'],
            ['name' => 'High Density Reading'],
            ['name' => 'Big Circles'],
            ['name' => 'Speedup/Slowdown'],
            ['name' => 'Jank'],
        ];

        BeatmapTag::insert($tags);
    }
}
