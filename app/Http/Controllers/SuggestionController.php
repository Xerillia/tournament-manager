<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuggestionRequest;
use App\Http\Requests\UpdateSuggestionRequest;
use App\Models\Beatmap;
use App\Models\BeatmapTag;
use App\Models\Mappool;
use App\Models\MappoolSuggestion;
use App\Models\Tournament;
use App\Services\OsuService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SuggestionController extends Controller
{
    public function index(Tournament $tournament, Mappool $mappool)
    {
        $mappool->load(['suggestions.beatmap', 'suggestions.user', 'suggestions.tags', 'suggestions.comments.comment.user', 'suggestions.comments.parent.comment.user']);

        $tags = BeatmapTag::all();

        return Inertia::render('suggestions', [
            'tournament' => $tournament,
            'mappool' => $mappool,
            'tags' => $tags,
        ]);
    }

    public function store(StoreSuggestionRequest $request, Tournament $tournament, Mappool $mappool)
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
        $beatmap = Beatmap::whereBeatmapId($beatmapId)->whereMods($mods)->first();
        if (! $beatmap) {
            try {
                $accessToken = Auth::user()->getAccessToken();
                $beatmapObject = (new OsuService)->getBeatmap($accessToken, $beatmapId, $array_mods);
                $beatmap = Beatmap::updateOrCreate($beatmapObject->toArray());
            } catch (\Exception $e) {
                return to_route('tournaments.suggestions.index', [$tournament, $round])->with('beatmap_not_found', 'Beatmap not found!');
            }
        }
        // only create the suggestion if a valid beatmap is found
        if ($beatmap) {
            MappoolSuggestion::create([
                'mappool_id' => $mappool->id,
                'beatmap_id' => $beatmap->id,
                'user_id' => Auth::id(),
            ]);
        }

        return to_route('tournaments.suggestions.index', [$tournament, $round]);
    }

    public function update(UpdateSuggestionRequest $request, Tournament $tournament, Mappool $mappool, MappoolSuggestion $suggestion)
    {
        // validating
        $validated = $request->validated();
        $beatmapId = $validated['beatmap_id'];
        $mods = $validated['mods'];

        // manipulate string with array methods
        $array_mods = str_split($mods, 2);
        sort($array_mods);
        $mods = implode(' ', $array_mods); // 'DT HD', 'HD HR', ...

        // loading beatmap
        $beatmap = Beatmap::whereBeatmapId($beatmapId)->whereMods($mods)->first();
        if (! $beatmap) {
            try {
                $accessToken = Auth::user()->getAccessToken();
                $beatmapObject = (new OsuService)->getBeatmap($accessToken, $beatmapId, $array_mods);
                $beatmap = Beatmap::updateOrCreate($beatmapObject->toArray());
            } catch (\Exception $e) {
                return to_route('tournaments.suggestions.index', [$tournament, $suggestion->mappool->round])->withErrors(['beatmap_not_found' => 'Beatmap does not exist!']);
            }
        }

        // only update the suggestion if a valid beatmap is found
        if ($beatmap) {
            $suggestion->update([
                'beatmap_id' => $beatmap->id,
            ]);
        }

        return to_route('tournaments.suggestions.index', [$tournament, $suggestion->mappool->round]);
    }

    public function destroy(Tournament $tournament, Mappool $mappool, MappoolSuggestion $suggestion)
    {
        $suggestion->delete();

        return to_route('tournaments.suggestions.index', [$tournament, $suggestion->mappool->round]);
    }
}
