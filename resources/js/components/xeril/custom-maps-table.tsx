import { CustomMapStatusUtils } from '@/enums';
import { addCustomMap, removeCustomMap } from '@/routes/tournaments/custom';
import { CustomMap } from '@/types/custommap';
import { Mappool } from '@/types/mappools';
import { Tournament } from '@/types/tournament';
import { router, useForm } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';

interface CustomMapsTableProps {
    tournament: Tournament;
    mappools: Mappool[];
    customMaps: CustomMap[];
}

const columnHelper = createColumnHelper<CustomMap>();

export default function CustomMapsTable({ tournament, mappools, customMaps }: CustomMapsTableProps) {
    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'action',
                header: 'Action',
                cell: (props) => {
                    const customMap = props.row.original;
                    const [show, setShow] = useState<boolean>(false);

                    function handleConfirm() {
                        console.log(customMap);
                        router.delete(removeCustomMap(customMap.id), {
                            onSuccess: () => setShow(false),
                        });
                    }

                    return (
                        <>
                            <button
                                type="button"
                                className="cursor-pointer rounded-md bg-red-300 p-1 hover:bg-red-400"
                                onClick={() => setShow(true)}
                            >
                                <Trash2Icon />
                            </button>
                            {show && (
                                <div className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40">
                                    <div className="z-11 w-md rounded-md bg-white p-4 shadow-sm">
                                        <h1 className="border-b border-black pb-2 text-2xl font-bold">Confirmation</h1>
                                        <div className="my-6">
                                            <p>Are you sure you want to delete:</p>
                                            <ul className="my-3">
                                                <li>{customMap.beatmap_name}</li>
                                                <li>{customMap.mappool.round}</li>
                                                <li>{customMap.mods}</li>
                                            </ul>
                                            <p>This action is unrecoverable!</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="flex-1 cursor-pointer rounded-sm bg-red-300 p-1 shadow-sm transition-colors hover:bg-red-400"
                                                onClick={handleConfirm}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                type="button"
                                                className="flex-1 cursor-pointer rounded-sm bg-blue-300 p-1 shadow-sm transition-colors hover:bg-blue-400"
                                                onClick={() => setShow(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                },
            }),
            columnHelper.accessor('mapper', {
                header: 'Mapper',
            }),
            columnHelper.accessor('beatmap_url', {
                header: 'URL',
            }),
            columnHelper.accessor('beatmap_name', {
                header: 'Beatmap',
            }),
            columnHelper.accessor('mappool.round', {
                header: 'Round',
            }),
            columnHelper.accessor('mods', {
                header: 'Mods',
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (props) => CustomMapStatusUtils.label(props.getValue()),
            }),
            columnHelper.accessor('bpm', {
                header: 'BPM',
            }),
            columnHelper.accessor('cs', {
                header: 'CS',
            }),
            columnHelper.accessor('ar', {
                header: 'AR',
            }),
            columnHelper.accessor('od', {
                header: 'OD',
            }),
        ],
        [],
    );

    const table = useReactTable({
        data: customMaps,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const { data, setData, post, processing, errors, transform, resetAndClearErrors } = useForm({
        mapper: '',
        beatmap_url: '',
        beatmap_name: '',
        round: 'Quarterfinals',
        mods: '',
        status: 'default',
        bpm: '',
        cs: '',
        ar: '',
        od: '',
    });

    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        transform((data) => ({ ...data, mods: data.mods.toUpperCase() }));
        post(addCustomMap(tournament).url, {
            onSuccess: () => resetAndClearErrors(),
        });
    }

    return (
        <div className="mx-auto mt-6">
            {errors.round && <p>{errors.round}</p>}
            <form onSubmit={submit}>
                <table>
                    <thead className="border-b bg-gray-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            className="p-2 text-center"
                                            style={{
                                                width: header.column.getSize(),
                                            }}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        <tr className="bg-gray-50">
                            <td />
                            <td>
                                <input
                                    type="text"
                                    name="mapper"
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="Usernames..."
                                    autoComplete="off"
                                    value={data.mapper}
                                    onChange={(e) => setData('mapper', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="beatmap_url"
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="Beatmap url..."
                                    autoComplete="off"
                                    value={data.beatmap_url}
                                    onChange={(e) => setData('beatmap_url', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="beatmap_name"
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="Beatmap name..."
                                    autoComplete="off"
                                    value={data.beatmap_name}
                                    onChange={(e) => setData('beatmap_name', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <select
                                    name="round"
                                    className="h-12 w-full border border-gray-50 text-center focus:outline-0"
                                    value={data.round}
                                    onChange={(e) => setData('round', e.target.value)}
                                    required
                                >
                                    {mappools.map((mappool) => (
                                        <option
                                            key={mappool.round}
                                            value={mappool.round}
                                        >
                                            {mappool.round}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="mods"
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="Mods..."
                                    autoComplete="off"
                                    value={data.mods}
                                    onChange={(e) => setData('mods', e.target.value)}
                                    required
                                />
                                {errors.mods && <p className="text-center text-red-400">{errors.mods}</p>}
                            </td>
                            <td>
                                <select
                                    name="status"
                                    className="h-12 border border-gray-50 text-center focus:outline-0"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    required
                                >
                                    <option
                                        disabled
                                        className="hidden"
                                        value="default"
                                    >
                                        Select...
                                    </option>
                                    {CustomMapStatusUtils.options().map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {CustomMapStatusUtils.label(option)}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="bpm"
                                    min={0}
                                    step={0.01}
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="BPM..."
                                    value={data.bpm}
                                    onChange={(e) => setData('bpm', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="cs"
                                    min={0}
                                    step={0.01}
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="CS..."
                                    value={data.cs}
                                    onChange={(e) => setData('cs', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="ar"
                                    min={0}
                                    step={0.01}
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="AR..."
                                    value={data.ar}
                                    onChange={(e) => setData('ar', e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="od"
                                    min={0}
                                    step={0.01}
                                    className="h-12 text-center focus:outline-0"
                                    placeholder="OD..."
                                    value={data.od}
                                    onChange={(e) => setData('od', e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11}>
                                <button
                                    type="submit"
                                    className="h-8 w-full cursor-pointer bg-green-300 text-center hover:bg-green-400"
                                    disabled={processing}
                                >
                                    Insert
                                </button>
                            </td>
                        </tr>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="odd:bg-gray-100 hover:bg-black/20"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className="h-12 text-center"
                                            key={cell.id}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>
    );
}
