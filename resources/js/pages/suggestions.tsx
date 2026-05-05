import AssemblyTable from '@/components/xeril/assembly-table';
import SuggestionTable from '@/components/xeril/suggestion-table';
import { addSuggestion } from '@/routes/mappools';
import { BeatmapTag } from '@/types/beatmaptag';
import { Mappool, Slot } from '@/types/mappools';
import { Tournament } from '@/types/tournament';
import { DragDropProvider } from '@dnd-kit/react';
import { Form, usePage } from '@inertiajs/react';

interface SuggestionsProps {
    tournament: Tournament;
    mappool: Mappool;
    tags: BeatmapTag[];
    slots: Slot[];
}

export default function Suggestions({ tournament, mappool, tags, slots }: SuggestionsProps) {
    const { flash } = usePage().props;

    const suggestionPanel = (
        <>
            <Form
                action={addSuggestion(mappool)}
                resetOnSuccess
                transform={(data) => ({
                    ...data,
                    mods: data.mods.replace(/\s+/g, ''),
                })}
            >
                {({ errors, invalid, validate, processing }) => (
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
                            autoComplete="off"
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
                            disabled={processing}
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
            <DragDropProvider>
                <div className="mx-8 my-4 flex gap-4">
                    <div className="max-w-1/2 overflow-auto">
                        <SuggestionTable
                            mappool={mappool}
                            tournament={tournament}
                            tags={tags}
                        />
                    </div>
                    <div className="max-w-1/2 overflow-auto">
                        <AssemblyTable
                            mappool={mappool}
                            slots={slots}
                        />
                    </div>
                </div>
            </DragDropProvider>
        </>
    );
}
