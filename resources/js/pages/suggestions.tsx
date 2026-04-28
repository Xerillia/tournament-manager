import { store } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Tournament } from '@/types/tournament';
import { Form } from '@inertiajs/react';

interface SuggestionsProps {
    tournament: Tournament;
    mappools: Mappool[];
}
export default function Suggestions({ tournament, mappools }: SuggestionsProps) {
    const suggestionPanel = (
        <div>
            <Form
                action={store(tournament)}
                method="post"
                resetOnSuccess
            >
                {({ errors, invalid, validate }) => (
                    <>
                        <input
                            type="number"
                            name="beatmap_id"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Beatmap ID"
                            required
                            onChange={() => validate('beatmap_id')}
                        />
                        {invalid('beatmap_id') && <p className="text-red-400">{errors.beatmap_id}</p>}
                        <input
                            type="text"
                            name="mods"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Mods"
                            required
                            onChange={() => validate('mods')}
                        />
                        {invalid('mods') && <p className="text-red-400">{errors.mods}</p>}
                        <select
                            name="round"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            onChange={() => validate('round')}
                        >
                            {mappools.map((mappool) => (
                                <option value={mappool.round}>{mappool.round}</option>
                            ))}
                        </select>
                        {invalid('round') && <p className="text-red-400">{errors.round}</p>}
                        <button
                            type="submit"
                            className="block bg-green-300 p-2 hover:cursor-pointer hover:bg-green-400"
                        >
                            Submit
                        </button>
                    </>
                )}
            </Form>
        </div>
    );
    return suggestionPanel;
}
