<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuggestionRequest;
use App\Models\Beatmap;
use App\Models\Mappool;
use App\Models\MappoolSuggestion;
use App\Models\Tournament;
use App\Services\OsuService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SuggestionController extends Controller
{
    public function index(Tournament $tournament)
    {
        $tournament->load(['mappools.suggestions.beatmap']);

        return Inertia::render('suggestions', [
            'tournament' => $tournament,
            'mappools' => $tournament->mappools,
        ]);
    }

    public function store(StoreSuggestionRequest $request, Tournament $tournament)
    {
        // validating
        $validated = $request->validated();
        $beatmapId = $validated['beatmap_id'];
        $mods = $validated['mods'];
        $round = $validated['round'];

        // manipulate string with array methods
        $array_mods = str_split($mods, 2);
        sort($array_mods);
        $mods = implode(' ', $array_mods); // 'DT HD', 'HD HR', ...

        // loading beatmap
        $beatmap = Beatmap::whereId($beatmapId)->whereMods($mods)->first();
        if (! $beatmap) {
            $accessToken = Auth::user()->getAccessToken();
            $beatmapObject = (new OsuService)->getBeatmap($accessToken, $beatmapId, $array_mods);
            $beatmap = Beatmap::updateOrCreate($beatmapObject->toArray());
        }

        // create suggestion
        $mappool = Mappool::whereTournamentId($tournament->id)->whereRound($round)->first();
        MappoolSuggestion::create([
            'mappool_id' => $mappool->id,
            'beatmap_id' => $beatmap->id,
            'mods' => $mods,
            // 'tags' => $validated['tags'] ?? null,
        ]);

        // should not move anywhere
        return $this->index($tournament);
    }
}
