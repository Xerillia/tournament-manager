<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteMappoolFormatRequest;
use App\Http\Requests\UpdateFreemodRulesRequest;
use App\Http\Requests\UpdateMappoolFormatRequest;
use App\Models\BeatmapTag;
use App\Models\FreemodRule;
use App\Models\Mappool;
use App\Models\MappoolFormat;
use App\Models\Tournament;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PoolingController extends Controller
{
    /**
     * Show the pooling panel
     */
    public function showPoolingPanel(Tournament $tournament, Mappool $mappool)
    {
        $mappool->load([
            'suggestions.beatmap',
            'suggestions.user',
            'suggestions.tags',
            'suggestions.comments.comment.user',
            'suggestions.comments.parent.comment.user',
            'formats.slots.suggestion.beatmap',
            'formats.slots.suggestion.tags',
            'formats.slots.suggestion.comments.comment.user',
            'formats.slots.suggestion.comments.parent.comment.user',
            'freemodRules',
        ]);

        $slots = collect($mappool->formats)->flatMap(fn ($item) => $item['slots']);

        $tags = BeatmapTag::all();

        return Inertia::render('suggestions', [
            'tournament' => $tournament,
            'mappool' => $mappool,
            'tags' => $tags,
            'slots' => $slots,
        ]);
    }

    /**
     * Show the edit mappools format form
     */
    public function editMappoolsFormat(Tournament $tournament)
    {
        $tournament->load(['mappools.formats', 'mappools.freemodRules']);

        return Inertia::render('edit-mappools-format', [
            'tournament' => $tournament,
            'mappools' => $tournament->mappools,
        ]);
    }

    /**
     * Update the mappools' format
     */
    public function updateMappoolsFormat(UpdateMappoolFormatRequest $request, Tournament $tournament)
    {
        foreach ($request->mappools as $mappool) {
            $retrieved_mappool = Mappool::updateOrCreate([
                'id' => $mappool['id'],
                'tournament_id' => $tournament->id,
            ],
                [
                    'round' => $mappool['round'],
                    'slug' => Str::slug($mappool['round']),
                    'star_rating' => (float) $mappool['star_rating'],
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
                        'is_freemod' => $format['is_freemod'],
                    ]);
            }

        }

        return redirect()->back();
    }

    /**
     * Delete the mappools' format
     */
    public function deleteMappoolsFormat(DeleteMappoolFormatRequest $request)
    {
        $collected = $request->safe()->collect();

        if ($collected->has('delete_queue')) {
            $collected_delete_queue = collect($collected->get('delete_queue'));

            $filtered = $collected_delete_queue->filter(function (int $value) {
                return $value > 0;
            });

            Mappool::destroy($filtered->toArray());
        }

        if ($collected->has('delete_format_queue')) {
            $collected_delete_format_queue = collect($collected->get('delete_format_queue'));

            $filtered = $collected_delete_format_queue->filter(function (array $values) {
                return $values['format_id'] > 0;
            });

            $flatMapped = $filtered->flatMap(function (array $values) {
                return [$values['format_id']];
            });

            MappoolFormat::destroy($flatMapped->toArray());
        }

        return redirect()->back();
    }

    /**
     * Update the freemod rules
     */
    public function updateFreemodRules(UpdateFreemodRulesRequest $request)
    {
        $validated = $request->validated();
        if (! Arr::has($validated, 'payload')) {
            return redirect()->back()->withErrors(['empty_payload' => 'Freemod Rules Payload is missing!']);
        }

        foreach ($request->validated()['payload'] as $data) {
            foreach ($data['rules'] as $rule) {
                if (! $rule['allowed']) {
                    FreemodRule::whereMappoolId($data['mappool_id'])->whereMod($rule['mod'])->delete();

                    continue;
                }

                FreemodRule::updateOrCreate(
                    [
                        'mappool_id' => $data['mappool_id'],
                        'mod' => $rule['mod'],
                    ],
                    [
                        'allowed' => $rule['allowed'],
                        'multiplier' => $rule['multiplier'],
                    ]);
            }
        }

        return redirect()->back();
    }
}
