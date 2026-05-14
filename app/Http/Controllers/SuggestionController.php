<?php

namespace App\Http\Controllers;

use App\Enums\Mode;
use App\Http\Requests\StoreSuggestionRequest;
use App\Http\Requests\UpdateSuggestionRequest;
use App\Models\Beatmap;
use App\Models\Mappool;
use App\Models\MappoolSuggestion;
use App\Services\OsuService;
use Illuminate\Support\Facades\Auth;

class SuggestionController extends Controller
{
    public function addSuggestion(StoreSuggestionRequest $request, Mappool $mappool)
    {
        // validating
        $validated = $request->validated();
        $beatmapId = $validated['beatmap_id'];
        $mods = $validated['mods'];
        $mode = $request->enum('mode', Mode::class, Mode::STANDARD);

        // manipulate string with array methods
        $array_mods = str_split($mods, 2);
        sort($array_mods);
        $mods = implode(' ', $array_mods); // 'DT HD', 'HD HR', ...

        // loading beatmap
        $beatmap = Beatmap::whereBeatmapId($beatmapId)->whereMods($mods)->whereMode($mods)->first();
        if (! $beatmap) {
            try {
                $accessToken = Auth::user()->getAccessToken();
                $beatmapObject = (new OsuService)->getBeatmap($accessToken, $beatmapId, $array_mods, $mode);
                $beatmap = Beatmap::updateOrCreate($beatmapObject->toArray());
            } catch (\Exception $e) {
                return redirect()->back()->with('beatmap_not_found', 'Beatmap not found!');
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

        return redirect()->back();
    }

    public function updateSuggestion(UpdateSuggestionRequest $request, MappoolSuggestion $suggestion)
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
                return redirect()->back()->withErrors(['beatmap_not_found' => 'Beatmap does not exist!']);
            }
        }

        // only update the suggestion if a valid beatmap is found
        if ($beatmap) {
            $suggestion->update([
                'beatmap_id' => $beatmap->id,
            ]);
        }

        return redirect()->back();
    }

    public function deleteSuggestion(MappoolSuggestion $suggestion)
    {
        $suggestion->delete();

        return redirect()->back();
    }
}
