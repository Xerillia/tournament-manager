import { store } from '@/actions/App/Http/Controllers/SuggestionController';
import { Mappool, Suggestion } from '@/types/mappools';
import { Tournament } from '@/types/tournament';
import { useForm } from '@inertiajs/react';
import { Fragment } from 'react/jsx-runtime';

interface SuggestionsProps {
    tournament: Tournament;
    mappools: Mappool[];
    suggestions: Suggestion[];
}
export default function Suggestions({ tournament, mappools, suggestions }: SuggestionsProps) {
    const { data, setData, post, processing, errors, hasErrors, invalid, validate, resetAndClearErrors } = useForm({
        beatmap_id: '',
        mods: '',
        round: '',
    }).withPrecognition('post', store(tournament).url);

    function attemptSubmission() {
        if (!hasErrors && Object.values(data).every((value) => value)) {
            post(store(tournament).url, {
                onSuccess: () => {
                    resetAndClearErrors();
                },
            });
        }
    }

    const roundLists = mappools.map((mappool) => {
        const { data, setData, post, processing, errors, hasErrors, invalid, validate, resetAndClearErrors } = useForm({
            beatmap_id: '',
            mods: '',
            round: mappool.round,
        }).withPrecognition('post', store(tournament).url);

        function attemptSubmission() {
            if (!hasErrors && Object.values(data).every((value) => value)) {
                post(store(tournament).url, {
                    onSuccess: () => {
                        resetAndClearErrors();
                    },
                });
            }
        }
        return (
            <Fragment key={mappool.id}>
                <h2 className="mt-4 text-xl font-bold">{mappool.round} Suggestions</h2>
                <table>
                    <thead>
                        <tr>
                            <th className="border-2 p-2">Beatmap ID</th>
                            <th className="w-24 border-2 p-2">Mods</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-2">
                                <input
                                    type="number"
                                    min="0"
                                    className="p-2 text-center"
                                    name="beatmap_id"
                                    placeholder="12345678"
                                    value={data.beatmap_id}
                                    onChange={(e) => setData('beatmap_id', e.target.value)}
                                    onBlur={() => {
                                        validate('beatmap_id');
                                        attemptSubmission();
                                    }}
                                    disabled={processing}
                                />
                                {invalid('beatmap_id') && <p className="max-w-40 self-center text-center wrap-break-word text-red-500">{errors.beatmap_id}</p>}
                            </td>
                            <td className="border-2">
                                <input
                                    type="text"
                                    className="w-40 p-2 text-center"
                                    name="mods"
                                    placeholder="NM"
                                    value={data.mods}
                                    onChange={(e) => setData('mods', e.target.value.toUpperCase().replace(/\s+/g, ''))}
                                    onBlur={() => {
                                        validate('mods');
                                        attemptSubmission();
                                    }}
                                    disabled={processing}
                                />
                                {invalid('mods') && <p className="max-w-40 self-center text-center wrap-break-word text-red-500">{errors.mods}</p>}
                            </td>
                            <th className="border-2 p-2">Cover</th>
                            <th className="border-2 p-2">Beatmap</th>
                            <th className="border-2 p-2">SR</th>
                            <th className="border-2 p-2">BPM</th>
                            <th className="border-2 p-2">CS</th>
                            <th className="border-2 p-2">AR</th>
                            <th className="border-2 p-2">OD</th>
                            <th className="border-2 p-2">Drain</th>
                            <th className="border-2 p-2">Max Combo</th>
                        </tr>
                        {mappool.suggestions.map((suggestion) => {
                            const beatmap = suggestion.beatmap;
                            return (
                                <tr
                                    key={beatmap.beatmap_id}
                                    className="p-2 text-center"
                                >
                                    <td className="border-2 p-2">{beatmap.beatmap_id}</td>
                                    <td className="border-2 p-2">{beatmap.mods}</td>
                                    <td className="w-48 border-2">
                                        <img src={'https://assets.ppy.sh/beatmaps/' + beatmap.beatmapset_id + '/covers/cover.jpg'} />
                                    </td>
                                    <td className="border-2 p-2">
                                        <a
                                            href={'https://osu.ppy.sh/beatmapsets/' + beatmap.beatmapset_id + '#' + beatmap.mode + '/' + beatmap.beatmap_id}
                                            target="_blank"
                                            className="hover:text-blue-800 hover:underline"
                                        >
                                            {beatmap.artist} - {beatmap.title} [{beatmap.version}]
                                        </a>
                                    </td>
                                    <td className="border-2 p-2">{beatmap.star_rating.toFixed(2)} ★</td>
                                    <td className="border-2 p-2">{+beatmap.bpm.toFixed(2)}</td>
                                    <td className="border-2 p-2">{+beatmap.cs.toFixed(2)}</td>
                                    <td className="border-2 p-2">{+beatmap.ar.toFixed(2)}</td>
                                    <td className="border-2 p-2">{+beatmap.od.toFixed(2)}</td>
                                    <td className="border-2 p-2">{secondToTime(beatmap.drain)}</td>
                                    <td className="border-2 p-2">{beatmap.max_combo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    });

    const globalSuggestions = suggestions.map((suggestion) => {
        const beatmap = suggestion.beatmap;
        return (
            <tr
                key={beatmap.beatmap_id}
                className="p-2 text-center"
            >
                <td className="border-2 p-2">{beatmap.beatmap_id}</td>
                <td className="border-2 p-2">{beatmap.mods}</td>
                <td className="border-2 p-2">{suggestion.mappool.round}</td>
                <td className="w-48 border-2">
                    <img src={'https://assets.ppy.sh/beatmaps/' + beatmap.beatmapset_id + '/covers/cover.jpg'} />
                </td>
                <td className="border-2 p-2">
                    <a
                        href={'https://osu.ppy.sh/beatmapsets/' + beatmap.beatmapset_id + '#' + beatmap.mode + '/' + beatmap.beatmap_id}
                        target="_blank"
                        className="hover:text-blue-800 hover:underline"
                    >
                        {beatmap.artist} - {beatmap.title} [{beatmap.version}]
                    </a>
                </td>
                <td className="border-2 p-2">{beatmap.star_rating.toFixed(2)} ★</td>
                <td className="border-2 p-2">{+beatmap.bpm.toFixed(2)}</td>
                <td className="border-2 p-2">{+beatmap.cs.toFixed(2)}</td>
                <td className="border-2 p-2">{+beatmap.ar.toFixed(2)}</td>
                <td className="border-2 p-2">{+beatmap.od.toFixed(2)}</td>
                <td className="border-2 p-2">{secondToTime(beatmap.drain)}</td>
                <td className="border-2 p-2">{beatmap.max_combo}</td>
            </tr>
        );
    });

    function secondToTime(num: number) {
        const m = Math.floor(num / 60)
                .toString()
                .padStart(2, '0'),
            s = Math.floor(num % 60)
                .toString()
                .padStart(2, '0');

        return m + ':' + s;
    }

    return (
        <>
            <h1 className="text-3xl font-bold">Global Suggestions</h1>
            <form>
                <table>
                    <thead>
                        <tr>
                            <th className="border-2 p-2">Beatmap ID</th>
                            <th className="border-2 p-2">Mods</th>
                            <th className="border-2 p-2">Round</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-2">
                            <td className="border-2">
                                <input
                                    type="number"
                                    min="0"
                                    className="p-2 text-center"
                                    name="beatmap_id"
                                    placeholder="12345678"
                                    value={data.beatmap_id}
                                    onChange={(e) => setData('beatmap_id', e.target.value)}
                                    onBlur={() => {
                                        validate('beatmap_id');
                                        attemptSubmission();
                                    }}
                                    disabled={processing}
                                />
                                {invalid('beatmap_id') && <p className="max-w-40 self-center text-center wrap-break-word text-red-500">{errors.beatmap_id}</p>}
                            </td>
                            <td className="border-2">
                                <input
                                    type="text"
                                    className="w-40 p-2 text-center"
                                    name="mods"
                                    placeholder="NM"
                                    value={data.mods}
                                    onChange={(e) => setData('mods', e.target.value.toUpperCase().replace(/\s+/g, ''))}
                                    onBlur={() => {
                                        validate('mods');
                                        attemptSubmission();
                                    }}
                                    disabled={processing}
                                />
                                {invalid('mods') && <p className="max-w-40 self-center text-center wrap-break-word text-red-500">{errors.mods}</p>}
                            </td>
                            <td className="border-2">
                                <select
                                    name="round"
                                    value={data.round}
                                    onChange={(e) => setData('round', e.target.value)}
                                    onBlur={() => {
                                        validate('round');
                                        attemptSubmission();
                                    }}
                                    disabled={processing}
                                >
                                    <option value=""></option>
                                    {mappools.map((mappool) => (
                                        <option
                                            key={mappool.id}
                                            value={mappool.round}
                                        >
                                            {mappool.round}
                                        </option>
                                    ))}
                                </select>
                                {invalid('round') && <p className="max-w-40 self-center text-center wrap-break-word text-red-500">{errors.round}</p>}
                            </td>
                            <th className="border-2 p-2">Cover</th>
                            <th className="border-2 p-2">Beatmap</th>
                            <th className="border-2 p-2">SR</th>
                            <th className="border-2 p-2">BPM</th>
                            <th className="border-2 p-2">CS</th>
                            <th className="border-2 p-2">AR</th>
                            <th className="border-2 p-2">OD</th>
                            <th className="border-2 p-2">Drain</th>
                            <th className="border-2 p-2">Max Combo</th>
                        </tr>
                        {globalSuggestions}
                    </tbody>
                </table>
            </form>

            {roundLists}
        </>
    );
}
