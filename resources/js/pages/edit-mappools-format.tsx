import { update, destroy } from '@/actions/App/Http/Controllers/PoolingController';
import { Format, Mappool } from '@/types/mappools';
import { Form, router } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import { isEqual, cloneDeep } from 'lodash';

interface EditMappoolFormatProps {
    tournament_id: number;
    mappools: Mappool[];
}

let nextMappoolId = 0; // prevent arbitrary update or delete because database ids are unsigned integer
let nextFormatId = 0; // ^

export default function EditMappoolFormat({ tournament_id, mappools }: EditMappoolFormatProps) {
    const [getMappools, setMappools] = useState<Mappool[]>(cloneDeep(mappools));
    const [originalMappools, setOriginalMappools] = useState<Mappool[]>(cloneDeep(mappools));
    const [editMode, setEditMode] = useState<boolean>(false);

    if (!isEqual(originalMappools, mappools)) {
        // prop has changed
        setMappools(mappools);
        setOriginalMappools(cloneDeep(mappools));
    }

    const indexOf = (mappool: Mappool) => getMappools.findIndex((obj) => obj.id === mappool.id);
    const filteredOut = (mappool: Mappool) => getMappools.filter((obj) => obj.id !== mappool.id);

    const addRound = () => setMappools([...getMappools, { id: nextMappoolId--, round: '', formats: [], suggestions: [], slug: '', star_rating: 0 }]);

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
        mappool.formats = [...mappool.formats, { id: nextFormatId--, mappool_id: mappool.id, slot: '', count: 1 }];

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

    function setStarRating(e: ChangeEvent<HTMLInputElement>, mappool: Mappool) {
        const value = e.target.value;
        const regex = /^\d*\.?\d{0,2}$/;
        if (value === '' || regex.test(value)) {
            mappool.star_rating = value;
        }

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

    function formatLeftAndRight(format: Format, mappool: Mappool, left: boolean = false) {
        const index = mappool.formats.findIndex((obj) => obj.id === format.id);

        let offset = 1;
        if (left) offset = -1;

        [mappool.formats[index], mappool.formats[index + offset]] = [mappool.formats[index + offset], mappool.formats[index]];
        [mappool.formats[index].id, mappool.formats[index + offset].id] = [mappool.formats[index + offset].id, mappool.formats[index].id];

        updateOrInsertMappool(mappool);
    }

    const [deleteQueue, setDeleteQueue] = useState<number[]>([]);

    function handleDeleteMappool(mappool: Mappool) {
        setDeleteQueue([...deleteQueue, mappool.id]);

        setDeleteFormatQueue([...deleteFormatQueue.filter((obj) => obj.mappool_id !== mappool.id)]);

        removeMappool(mappool);
    }

    const [deleteFormatQueue, setDeleteFormatQueue] = useState<{ format_id: number; mappool_id: number }[]>([]);

    function handleDeleteFormat(format: Format, mappool: Mappool) {
        setDeleteFormatQueue([...deleteFormatQueue, { format_id: format.id, mappool_id: mappool.id }]);

        removeFormat(format, mappool);
    }

    function handleSuccess() {
        if (deleteQueue.length > 0 || deleteFormatQueue.length > 0) {
            router.delete(destroy(tournament_id).url, {
                data: {
                    delete_queue: deleteQueue,
                    delete_format_queue: deleteFormatQueue,
                },
            });
        }

        setEditMode(false);
    }

    function handleCancel() {
        setMappools(cloneDeep(originalMappools));

        setDeleteQueue([]);
        setDeleteFormatQueue([]);

        setEditMode(false);
    }

    return (
        <>
            <Form
                method="put"
                onSubmit={() => update(tournament_id)}
                onSuccess={handleSuccess}
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
                                            onClick={() => handleDeleteMappool(mappool)}
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
                                            autoComplete="off"
                                        />
                                    </label>
                                    <label className="flex flex-col items-center justify-center">
                                        Star Rating
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                name={'mappools[' + mappool.id + '][star_rating]'}
                                                placeholder="5.0"
                                                className="block w-16 rounded-md border border-slate-800 p-2 text-center"
                                                value={typeof mappool.star_rating === 'number' ? Number(mappool.star_rating).toFixed(2) : mappool.star_rating}
                                                onChange={(e) => setStarRating(e, mappool)}
                                                disabled={!editMode}
                                                autoComplete="off"
                                            />
                                            <span className="text-xl">&#9733;</span>
                                        </div>
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
                                                    onClick={() => handleDeleteFormat(format, mappool)}
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
