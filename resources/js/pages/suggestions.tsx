import SuggestionTable from '@/components/xeril/suggestion-table';
import { store } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Tournament } from '@/types/tournament';
import { Form, usePage } from '@inertiajs/react';

interface SuggestionsProps {
    tournament: Tournament;
    mappool: Mappool;
}

export default function Suggestions({ tournament, mappool }: SuggestionsProps) {
    const { flash } = usePage().props;

    const suggestionPanel = (
        <>
            <Form
                action={store([tournament, mappool])}
                method="post"
                resetOnSuccess
                transform={(data) => ({
                    ...data,
                    mods: data.mods.replace(/\s+/g, ''),
                })}
            >
                {({ errors, invalid, validate }) => (
                    <>
                        <input
                            type="number"
                            name="beatmap_id"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Beatmap ID"
                            required
                            onBlur={() => validate('beatmap_id')}
                        />
                        {invalid('beatmap_id') && <p className="text-red-400">{errors.beatmap_id}</p>}
                        <input
                            type="text"
                            name="mods"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Mods"
                            required
                            onBlur={() => validate('mods')}
                        />
                        {invalid('mods') && <p className="text-red-400">{errors.mods}</p>}
                        <input
                            type="hidden"
                            name="round"
                            value={mappool.round}
                        />
                        <button
                            type="submit"
                            className="block bg-green-300 p-2 hover:cursor-pointer hover:bg-green-400"
                        >
                            Submit
                        </button>
                    </>
                )}
            </Form>
            {flash.beatmap_not_found && <p className="text-red-500">{flash.beatmap_not_found}</p>}
        </>
    );

    return (
        <>
            <div className="grid place-items-center">{suggestionPanel}</div>
            <SuggestionTable
                mappool={mappool}
                tournament={tournament}
            />
        </>
    );
}
