<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMappoolFormatRequest;
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
        dd($request);
    }
}
