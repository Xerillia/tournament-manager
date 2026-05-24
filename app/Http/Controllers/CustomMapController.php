<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCustomMapRequest;
use App\Models\CustomMap;
use App\Models\Mappool;
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
            'mappools' => $tournament->mappools,
            'customMaps' => $customMaps,
        ]);
    }

    public function addCustomMap(CreateCustomMapRequest $request, Tournament $tournament)
    {
        $payload = [
            'tournament_id' => $tournament->id,
            'mappool_id' => Mappool::whereTournamentId($tournament->id)->whereRound($request->safe()->only('round')['round'])->first()->id,
        ];

        CustomMap::create($request->safe()->merge($payload)->toArray());

        return redirect()->back();
    }
}
