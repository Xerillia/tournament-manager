import { Format, Mappool } from '@/types/mappools';
import { Form, router } from '@inertiajs/react';
import { ChangeEvent, Fragment, useState } from 'react';
import { isEqual, cloneDeep } from 'lodash';
import { Tournament } from '@/types/tournament';
import { deleteMappoolsFormat, updateMappoolsFormat } from '@/routes/tournaments/pooling/formats';
import { ModsUtils } from '@/enums';
import { updateFreemodRules } from '@/routes/tournaments/pooling/freemod/rules';

interface EditMappoolFormatProps {
    tournament: Tournament;
    mappools: Mappool[];
}

let nextMappoolId = 0; // prevent arbitrary update or delete because database ids are unsigned integer
let nextFormatId = 0; // ^

export default function EditMappoolFormat({ tournament, mappools }: EditMappoolFormatProps) {
    const [getMappools, setMappools] = useState<Mappool[]>(cloneDeep(mappools));
    const [originalMappools, setOriginalMappools] = useState<Mappool[]>(cloneDeep(mappools));
    const [editMode, setEditMode] = useState<boolean>(false);

    if (!isEqual(originalMappools, mappools)) {
        // prop has changed
        setMappools(mappools);
        setOriginalMappools(cloneDeep(mappools));
    }

    const addRound = () =>
        setMappools([...getMappools, { id: nextMappoolId--, round: '', formats: [], suggestions: [], slug: '', star_rating: 0, freemod_rules: [] }]);

    function removeMappool(mappool: Mappool) {
        setMappools((prevState) => {
            const filtered = prevState.filter((obj) => obj.id !== mappool.id);

            return filtered;
        });
    }

    function updateOrInsertMappool(mappool: Mappool) {
        setMappools((prevState) => {
            const index = prevState.findIndex((obj) => obj.id === mappool.id);
            const filtered = prevState.filter((obj) => obj.id !== mappool.id);

            return [
                ...filtered.slice(0, index), // elements before index
                mappool,
                ...filtered.slice(index), // elements after index
            ];
        });
    }

    function addFormat(mappool: Mappool) {
        mappool.formats = [...mappool.formats, { id: nextFormatId--, mappool_id: mappool.id, slot: '', count: 1, is_freemod: false }];

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
        if (freemodPayload.length > 0) {
            router.post(updateFreemodRules(), {
                payload: freemodPayload,
            });
        }

        if (deleteQueue.length > 0 || deleteFormatQueue.length > 0) {
            router.delete(deleteMappoolsFormat(), {
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

    const [modal, setModal] = useState<{ id?: number }>({});

    const [freemodPayload, setFreemodPayload] = useState<{ mappool_id: number; rules: { mod: string; allowed: boolean; multiplier: number }[] }[]>([]);

    const openModal = (mappool: Mappool) => {
        setModal({ id: mappool.id });

        if (!freemodPayload.find((obj) => obj.mappool_id === mappool.id)) {
            setFreemodPayload((prevState) => [
                ...prevState,
                {
                    mappool_id: mappool.id,
                    rules: [
                        ...ModsUtils.options()
                            .filter((mod) => mod !== 'FM' && mod !== 'DT' && mod !== 'NC')
                            .map((mod) => {
                                const loadedFromProps = mappool.freemod_rules.find((obj) => obj.mod === mod);

                                return {
                                    mod: mod,
                                    allowed: loadedFromProps?.allowed ?? (mod === 'NM' || mod === 'HD' || mod === 'HR' || mod === 'EZ'),
                                    multiplier: loadedFromProps?.multiplier ?? (mod === 'EZ' ? 1.8 : 1),
                                };
                            }),
                    ],
                },
            ]);
        }
    };

    const loadPayload = (mappool_id: number) => {
        const payload = freemodPayload.find((obj) => obj.mappool_id === mappool_id);

        return payload;
    };

    const cancelPayload = (mappool_id: number) => {
        setFreemodPayload((prevState) => {
            const filtered = prevState.filter((obj) => obj.mappool_id !== mappool_id);
            return filtered;
        });

        setModal({});
    };

    function toggleTick(mappool_id: number, rule: { mod: string; allowed: boolean; multiplier: number }) {
        const payload = freemodPayload.find((obj) => obj.mappool_id === mappool_id);

        if (!payload) return;

        const index = payload.rules.findIndex((obj) => obj.mod === rule.mod);

        payload.rules[index] = {
            ...payload.rules[index],
            allowed: !rule.allowed,
        };

        updatePayloadState(payload);
    }

    function changeMultiplier(mappool_id: number, rule: { mod: string; allowed: boolean; multiplier: number }, new_multiplier: number) {
        const payload = freemodPayload.find((obj) => obj.mappool_id === mappool_id);

        if (!payload) return;

        const index = payload.rules.findIndex((obj) => obj.mod === rule.mod);

        payload.rules[index] = {
            ...payload.rules[index],
            multiplier: new_multiplier,
        };

        updatePayloadState(payload);
    }

    function updatePayloadState(payload: { mappool_id: number; rules: { mod: string; allowed: boolean; multiplier: number }[] }) {
        setFreemodPayload((prevState) => {
            const index = prevState.indexOf(payload);
            const excluded = prevState.filter((obj) => obj.mappool_id !== payload.mappool_id);

            return [...excluded.slice(0, index), payload, ...excluded.slice(index)];
        });
    }

    return (
        <>
            <h1 className="mb-4 text-4xl font-bold">Mappool Format Setting</h1>
            <Form
                method="put"
                onSubmit={() => updateMappoolsFormat(tournament.id)}
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
                                    <div className="flex flex-col gap-3 self-center text-right">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>Slot</span>
                                        <span>Count</span>
                                    </div>
                                    {mappool.formats.map((format) => (
                                        <div
                                            key={format.id}
                                            className="flex flex-col"
                                        >
                                            <label className="2 mb-2 flex flex-col items-center">
                                                Freemod
                                                <input
                                                    type="hidden"
                                                    name={'mappools[' + mappool.id + '][formats][' + format.id + '][is_freemod]'}
                                                    value="0"
                                                />
                                                <input
                                                    type="checkbox"
                                                    name={'mappools[' + mappool.id + '][formats][' + format.id + '][is_freemod]'}
                                                    className="size-5"
                                                    defaultChecked={format.is_freemod}
                                                    value="1"
                                                    disabled={!editMode}
                                                />
                                            </label>
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
                                                className="w-12 self-center rounded-md border border-slate-800 p-2 text-center"
                                                placeholder="NM"
                                                value={format.slot}
                                                onChange={(e) => setFormatSlot(format, e.target.value, mappool)}
                                                disabled={!editMode}
                                            />
                                            <input
                                                type="number"
                                                name={'mappools[' + mappool.id + '][formats][' + format.id + '][count]'}
                                                className="w-12 self-center rounded-md border border-slate-800 p-2 text-center"
                                                placeholder="6"
                                                value={format.count}
                                                onChange={(e) => setFormatCount(format, Number(e.target.value), mappool)}
                                                disabled={!editMode}
                                            />
                                            {editMode && (
                                                <button
                                                    type="button"
                                                    className="w-12 self-center rounded-md bg-red-200 hover:cursor-pointer hover:bg-red-300"
                                                    onClick={() => handleDeleteFormat(format, mappool)}
                                                >
                                                    Del
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {editMode && (
                                        <>
                                            <button
                                                type="button"
                                                className="block h-full w-12 self-center rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                                                onClick={() => addFormat(mappool)}
                                            >
                                                Add
                                            </button>

                                            <div className="self-center">
                                                {modal?.id === mappool.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-2 h-full w-full bg-black/30" />
                                                        <div className="fixed inset-0 top-1/2 left-1/2 z-3 h-fit w-xl -translate-1/2 rounded-md bg-white">
                                                            <h1 className="flex items-center justify-center border-b pt-4 pb-2 text-center text-2xl font-bold">
                                                                {mappool.round} FM Rules
                                                            </h1>
                                                            <div className="grid w-full grid-cols-3 gap-4 px-4 py-2 text-center">
                                                                <h1 className="text-xl font-bold">Available Mods</h1>
                                                                <h1 className="text-xl font-bold">Allowed?</h1>
                                                                <h1 className="text-xl font-bold">Multiplier</h1>
                                                                {loadPayload(mappool.id)?.rules.map((rule) => (
                                                                    <Fragment key={rule.mod}>
                                                                        <p className="border-b">{rule.mod}</p>
                                                                        <div className="border-b">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={rule.allowed}
                                                                                onChange={() => toggleTick(mappool.id, rule)}
                                                                                className="size-4"
                                                                            />
                                                                        </div>
                                                                        <input
                                                                            id={`${mappool.id}_${rule.mod}`}
                                                                            type="number"
                                                                            value={rule.multiplier}
                                                                            onChange={(e) => changeMultiplier(mappool.id, rule, Number(e.target.value))}
                                                                            step={0.1}
                                                                            className="border-b text-center focus:outline-0"
                                                                        />
                                                                    </Fragment>
                                                                ))}
                                                            </div>
                                                            <div className="mt-5 flex">
                                                                <button
                                                                    type="button"
                                                                    className="flex-1 cursor-pointer bg-green-300 p-3 hover:bg-green-400"
                                                                    onClick={() => setModal({})}
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="flex-1 cursor-pointer bg-red-300 p-3 hover:bg-red-400"
                                                                    onClick={() => cancelPayload(mappool.id)}
                                                                >
                                                                    Reset and Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <button
                                                    type="button"
                                                    className="block rounded-md bg-orange-200 p-2 hover:cursor-pointer hover:bg-orange-300"
                                                    onClick={() => openModal(mappool)}
                                                >
                                                    Set Default FM Multiplier
                                                </button>
                                            </div>
                                        </>
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
