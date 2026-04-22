<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMappoolFormatRequest;
use App\Models\Mappool;
use App\Models\Tournament;
use Inertia\Inertia;

class PoolingController extends Controller
{
    public function index(Tournament $tournament)
    {
        $tournament->load(['mappools.formats']);

        return Inertia::render('pooling', [
            'tournament' => $tournament,
        ]);
    }

    public function update(UpdateMappoolFormatRequest $request, Tournament $tournament)
    {
        foreach ($request->safe()->all()['mappools'] as $mappool) {
            Mappool::upsert([
                'id' => $mappool['id'],
                'round' => $mappool['round'],
                'tournament_id' => $tournament->id,
            ], uniqueBy: ['id'], update: ['round', 'tournament_id']);
        }

        return to_route('tournaments.pooling.index', [$tournament]);
    }
}
