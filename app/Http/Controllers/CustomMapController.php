<?php

namespace App\Http\Controllers;

use App\Models\CustomMap;
use App\Models\Tournament;
use Inertia\Inertia;

class CustomMapController extends Controller
{
    public function listCustomMaps(Tournament $tournament)
    {
        $tournament->load(['mappools']);

        $customMaps = CustomMap::whereTournamentId($tournament->id)->get();

        return Inertia::render('custom-maps', [
            'tournament' => $tournament,
            'customMaps' => $customMaps,
        ]);
    }
}
