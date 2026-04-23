<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteMappoolFormatRequest;
use App\Http\Requests\UpdateMappoolFormatRequest;
use App\Models\Mappool;
use App\Models\MappoolFormat;
use App\Models\Tournament;
use Illuminate\Support\Arr;
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
            $retrieved_mappool = Mappool::updateOrCreate([
                'id' => $mappool['id'],
                'tournament_id' => $tournament->id,
            ],
                [
                    'round' => $mappool['round'],
                ]);

            $formats = Arr::has($mappool, 'formats') ? $mappool['formats'] : [];
            foreach ($formats as $format) {
                MappoolFormat::updateOrCreate([
                    'id' => $format['id'],
                    'mappool_id' => $retrieved_mappool->id,
                ],
                    [
                        'slot' => $format['slot'],
                        'count' => $format['count'],
                    ]);
            }

        }

        return to_route('tournaments.pooling.index', [$tournament]);
    }

    /**
     * Delete rounds from the tournament
     */
    public function destroy(DeleteMappoolFormatRequest $request, Tournament $tournament)
    {
        $collected = $request->safe()->collect();

        if ($collected->has('delete')) {
            $collected = collect($collected->get('delete'));

            $filtered = $collected->filter(function (int $value, int $key) {
                return $value > 0;
            });

            Mappool::destroy($filtered->toArray());
        }

        return to_route('tournaments.pooling.index', [$tournament]);
    }
}
