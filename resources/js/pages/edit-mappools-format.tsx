import { update } from '@/actions/App/Http/Controllers/PoolingController';
import { Format, Mappool } from '@/types/mappools';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

interface EditMappoolFormatProps {
    tournament_id: number;
    mappools: Mappool[];
}

export default function EditMappoolFormat({ tournament_id, mappools }: EditMappoolFormatProps) {
    const [getMappools, setMappools] = useState<Mappool[]>(mappools);
    const [originalMappools, setOriginalMappools] = useState<Mappool[]>(JSON.parse(JSON.stringify(mappools)));
    const [editMode, setEditMode] = useState<boolean>(false);

    let nextMappoolId = getMappools.length > 0 ? Math.max(...getMappools.map((obj) => obj.id)) + 1 : 0;

    const indexOf = (mappool: Mappool) => getMappools.findIndex((obj) => obj.id === mappool.id);
    const filteredOut = (mappool: Mappool) => getMappools.filter((obj) => obj.id !== mappool.id);

    const addRound = () => setMappools([...getMappools, { id: nextMappoolId++, round: '', formats: [], suggestions: [] }]);

    function removeMappool(mappool: Mappool) {
        setMappools(filteredOut(mappool));
    }

    function updateOrInsertMappool(mappool: Mappool, index = indexOf(mappool)) {
        const filtered = filteredOut(mappool);

        setMappools([
            ...filtered.slice(0, index), // elements before index
            mappool,
            ...filtered.slice(index), // elements after index
        ]);
    }

    function addFormat(mappool: Mappool) {
        const nextFormatId = mappool.formats.length > 0 ? Math.max(...mappool.formats.map((obj) => obj.id)) + 1 : 0;

        mappool.formats = [...mappool.formats, { id: nextFormatId, mappool_id: mappool.id, slot: '', count: 0 }];

        updateOrInsertMappool(mappool);
    }

    function removeFormat(format: Format, mappool: Mappool) {
        mappool.formats = mappool.formats.filter((obj) => obj.id !== format.id);

        updateOrInsertMappool(mappool);
    }

    function setRound(round: string, mappool: Mappool) {
        mappool.round = round;

        updateOrInsertMappool(mappool);
    }

    function setFormatSlot(format: Format, slot: string, mappool: Mappool) {
        mappool.formats.find((obj) => obj.id === format.id)!.slot = slot;

        updateOrInsertMappool(mappool);
    }

    function setFormatCount(format: Format, count: number, mappool: Mappool) {
        mappool.formats.find((obj) => obj.id === format.id)!.count = count;

        updateOrInsertMappool(mappool);
    }

    function handleCancel() {
        setMappools(JSON.parse(JSON.stringify(originalMappools)));
        setEditMode(false);
    }

    function formatLeftAndRight(format: Format, mappool: Mappool, left: boolean = false) {
        const index = mappool.formats.findIndex((obj) => obj.id === format.id);

        let offset = 1;
        if (left) offset = -1;

        [mappool.formats[index], mappool.formats[index + offset]] = [mappool.formats[index + offset], mappool.formats[index]];
        [mappool.formats[index].id, mappool.formats[index + offset].id] = [mappool.formats[index + offset].id, mappool.formats[index].id];

        updateOrInsertMappool(mappool);
    }

    return (
        <>
            <Form
                action={update(tournament_id)}
                onSuccess={() => setEditMode(false)}
            >
                {({ errors }) => (
                    <>
                        {!editMode && (
                            <button
                                type="button"
                                className="mb-4 rounded-md bg-blue-200 px-2 py-1 hover:cursor-pointer hover:bg-blue-300"
                                onClick={() => setEditMode(!editMode)}
                            >
                                Edit
                            </button>
                        )}
                        {editMode && (
                            <div className="mb-4 flex gap-2">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-300 px-2 py-1 hover:cursor-pointer hover:bg-green-200"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-blue-200 px-2 py-1 hover:cursor-pointer hover:bg-blue-300"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        {getMappools.map((mappool) => (
                            <div
                                key={mappool.id}
                                className="mb-4 flex gap-2"
                            >
                                <div>
                                    {editMode && (
                                        <button
                                            type="button"
                                            className="h-full rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-300"
                                            onClick={() => removeMappool(mappool)}
                                        >
                                            Del
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-1 gap-4">
                                    <input
                                        type="hidden"
                                        name={'mappools[' + mappool.id + '][id]'}
                                        value={mappool.id}
                                    />
                                    <label className="self-center">
                                        Round
                                        <input
                                            type="text"
                                            name={'mappools[' + mappool.id + '][round]'}
                                            placeholder="Round of ..."
                                            className="block w-full rounded-md border border-slate-800 p-2"
                                            value={mappool.round}
                                            onChange={(e) => setRound(e.target.value, mappool)}
                                            disabled={!editMode}
                                        />
                                    </label>
                                    <p className="flex flex-col self-center">Slots: </p>
                                    <div className="flex flex-col gap-4 self-center text-right">
                                        <span>Slot</span>
                                        <span>Count</span>
                                    </div>
                                    {mappool.formats.map((format) => (
                                        <div
                                            key={format.id}
                                            className="flex flex-col"
                                        >
                                            {editMode && (
                                                <div className="flex justify-center">
                                                    {format !== mappool.formats.at(0) && (
                                                        <button
                                                            type="button"
                                                            className="aspect-square rounded-sm border hover:cursor-pointer"
                                                            onClick={() => formatLeftAndRight(format, mappool, true)}
                                                        >
                                                            &lt;
                                                        </button>
                                                    )}
                                                    {format !== mappool.formats.at(-1) && (
                                                        <button
                                                            type="button"
                                                            className="aspect-square rounded-sm border hover:cursor-pointer"
                                                            onClick={() => formatLeftAndRight(format, mappool, false)}
                                                        >
                                                            &gt;
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            <input
                                                type="hidden"
                                                name={'mappools[' + mappool.id + '][formats][' + format.id + '][id]'}
                                                value={format.id}
                                            />
                                            <input
                                                type="text"
                                                name={'mappools[' + mappool.id + '][formats][' + format.id + '][slot]'}
                                                className="w-12 rounded-md border border-slate-800 p-2 text-center"
                                                placeholder="NM"
                                                value={format.slot}
                                                onChange={(e) => setFormatSlot(format, e.target.value, mappool)}
                                                disabled={!editMode}
                                            />
                                            <input
                                                type="number"
                                                name={'mappools[' + mappool.id + '][formats][' + format.id + '][count]'}
                                                className="w-12 rounded-md border border-slate-800 p-2 text-center"
                                                placeholder="6"
                                                value={format.count}
                                                onChange={(e) => setFormatCount(format, Number(e.target.value), mappool)}
                                                disabled={!editMode}
                                            />
                                            {editMode && (
                                                <button
                                                    type="button"
                                                    className="w-12 self-end rounded-md bg-red-200 hover:cursor-pointer hover:bg-red-300"
                                                    onClick={() => removeFormat(format, mappool)}
                                                >
                                                    Del
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {editMode && (
                                        <button
                                            type="button"
                                            className="block h-full w-12 self-center rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                                            onClick={() => addFormat(mappool)}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {editMode && (
                            <button
                                type="button"
                                className="block aspect-square w-8 rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                                onClick={() => addRound()}
                            >
                                +
                            </button>
                        )}
                    </>
                )}
            </Form>
        </>
    );
}
