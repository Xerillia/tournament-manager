import { Format, Mappool } from '@/types/mappools';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

interface EditMappoolFormatProps {
    mappools: Mappool[];
}

export default function EditMappoolFormat({ mappools }: EditMappoolFormatProps) {
    const [getMappools, setMappools] = useState<Mappool[]>(mappools);

    let nextMappoolId = getMappools.length > 0 ? Math.max(...getMappools.map((obj) => obj.id)) + 1 : 0;

    const indexOf = (mappool: Mappool) => getMappools.findIndex((obj) => obj.id === mappool.id);
    const filteredOut = (mappool: Mappool) => getMappools.filter((obj) => obj.id !== mappool.id);

    const addRound = () => setMappools([...getMappools, { id: nextMappoolId++, round: '', formats: [], beatmaps: [] }]);

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

    return (
        <>
            <Form>
                {({}) => (
                    <>
                        {getMappools.map((mappool) => (
                            <div
                                key={mappool.id}
                                className="mb-4 flex gap-2"
                            >
                                <button
                                    type="button"
                                    className="block aspect-square h-10 self-center rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-300"
                                    onClick={() => removeMappool(mappool)}
                                >
                                    Del
                                </button>
                                <div className="flex flex-1 gap-4">
                                    <label>
                                        Round
                                        <input
                                            type="text"
                                            name={'mappool[' + mappool.id + '][round]'}
                                            placeholder="Round of ..."
                                            className="block w-full rounded-md border border-slate-800 p-2"
                                            value={mappool.round}
                                            onChange={(e) => setRound(e.target.value, mappool)}
                                        />
                                    </label>
                                    <p className="flex flex-col self-center">Slots: </p>
                                    {mappool.formats.map((format) => (
                                        <div
                                            key={format.id}
                                            className="flex flex-col"
                                        >
                                            <label className="text-right">
                                                {format === mappool.formats.at(0) && <span className="mr-2">Slot</span>}
                                                <input
                                                    type="text"
                                                    name={'mappool[' + mappool.id + '][formats][' + format.id + '][slot]'}
                                                    className="w-12 rounded-md border border-slate-800 p-2 text-center"
                                                    placeholder="NM"
                                                    value={format.slot}
                                                    onChange={(e) => setFormatSlot(format, e.target.value, mappool)}
                                                />
                                            </label>
                                            <label className="text-right">
                                                {format === mappool.formats.at(0) && <span className="mr-2">Amount</span>}
                                                <input
                                                    type="number"
                                                    name={'mappool[' + mappool.id + '][formats][' + format.id + '][count]'}
                                                    className="w-12 rounded-md border border-slate-800 p-2 text-center"
                                                    placeholder="6"
                                                    value={format.count}
                                                    onChange={(e) => setFormatCount(format, Number(e.target.value), mappool)}
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                className="w-12 self-end rounded-md bg-red-200 hover:cursor-pointer hover:bg-red-300"
                                                onClick={() => removeFormat(format, mappool)}
                                            >
                                                Del
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="block h-full w-12 self-center rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                                        onClick={() => addFormat(mappool)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="block aspect-square w-8 rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                            onClick={() => addRound()}
                        >
                            +
                        </button>
                    </>
                )}
            </Form>
        </>
    );
}
