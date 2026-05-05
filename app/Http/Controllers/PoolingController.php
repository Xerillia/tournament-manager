<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteMappoolFormatRequest;
use App\Http\Requests\UpdateMappoolFormatRequest;
use App\Models\BeatmapTag;
use App\Models\Mappool;
use App\Models\MappoolFormat;
use App\Models\Tournament;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PoolingController extends Controller
{
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

        return to_route('tournaments.pooling.index', [$tournament]);
    }
}
