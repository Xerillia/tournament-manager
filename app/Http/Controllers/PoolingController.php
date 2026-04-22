<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMappoolFormatRequest;
use App\Models\Mappool;
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

    public function update(UpdateMappoolFormatRequest $request, Tournament $tournament)
    {
        $filtered = [];
        foreach ($request->mappools as $mappool) {
            $filter = Arr::only($mappool, ['id', 'round']);
            $filter = Arr::add($filter, 'tournament_id', $tournament->id);
            $filtered[] = $filter;
        }

        Mappool::upsert($filtered, uniqueBy: ['id', 'tournament_id'], update: ['round']);

        return to_route('tournaments.pooling.index', [$tournament]);
    }
}
