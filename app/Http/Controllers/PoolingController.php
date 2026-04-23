<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteMappoolFormatRequest;
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

    /**
     * Update the tournament's mappool format
     */
    public function update(UpdateMappoolFormatRequest $request, Tournament $tournament)
    {
        foreach ($request->mappools as $mappool) {

            Mappool::updateOrCreate([
                'id' => $mappool['id'],
                'tournament_id' => $tournament->id,
            ],
                [
                    'round' => $mappool['round'],
                ]);
        }

        return to_route('tournaments.pooling.index', [$tournament]);
    }

    /**
     * Delete rounds from the tournament
     */
    public function destroy(DeleteMappoolFormatRequest $request, Tournament $tournament)
    {
        $validated = $request->validated();

        if ($validated && $validated['delete']) {
            Mappool::destroy($validated['delete']);
        }

        return to_route('tournaments.pooling.index', [$tournament]);
    }
}
