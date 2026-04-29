import { store } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Suggestion } from '@/types/suggestion';
import { Tournament } from '@/types/tournament';
import { Form } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface SuggestionsProps {
    tournament: Tournament;
    mappool: Mappool;
}

function secondToTime(num: number) {
    const m = Math.floor(num / 60)
            .toString()
            .padStart(2, '0'),
        s = Math.floor(num % 60)
            .toString()
            .padStart(2, '0');

    return m + ':' + s;
}

const columnHelper = createColumnHelper<Suggestion>();

const columns = [
    columnHelper.accessor('beatmap.beatmap_id', {
        header: 'Beatmap ID',
        size: 125,
    }),
    columnHelper.accessor('beatmap.mods', {
        header: 'Mods',
        size: 100,
    }),
    columnHelper.accessor((row) => row.beatmap, {
        id: 'banner',
        header: 'Banner',
        cell: (props) => <img src={`https://assets.ppy.sh/beatmaps/${props.getValue().beatmapset_id}/covers/cover.jpg`} />,
    }),
    columnHelper.accessor((row) => row.beatmap, {
        id: 'beatmap_name',
        header: 'Beatmap',
        cell: (props) => (
            <a
                href={`https://osu.ppy.sh/beatmapsets/${props.getValue().beatmapset_id}#${props.getValue().mode}/${props.getValue().beatmap_id}`}
                className="whitespace-nowrap underline hover:cursor-pointer"
            >
                {`${props.getValue().artist} - ${props.getValue().title} [${props.getValue().version}]`}
            </a>
        ),
        size: 800,
    }),
    columnHelper.accessor('beatmap.star_rating', {
        header: 'SR',
        cell: (props) => `${props.getValue().toFixed(2)} ★`,
        size: 75,
    }),
    columnHelper.accessor('beatmap.bpm', {
        header: 'BPM',
        cell: (props) => +props.getValue().toFixed(2),
        size: 75,
    }),
    columnHelper.accessor('beatmap.max_combo', {
        header: 'Max Combo',
        cell: (props) => `${props.getValue()}x`,
    }),
    columnHelper.accessor('beatmap.drain', {
        header: 'Drain',
        cell: (props) => secondToTime(props.getValue()),
        size: 75,
    }),
    columnHelper.accessor('beatmap.cs', {
        header: 'CS',
        cell: (props) => +props.getValue().toFixed(2),
        size: 75,
    }),
    columnHelper.accessor('beatmap.ar', {
        header: 'AR',
        cell: (props) => +props.getValue().toFixed(2),
        size: 75,
    }),
    columnHelper.accessor('beatmap.od', {
        header: 'OD',
        cell: (props) => +props.getValue().toFixed(2),
        size: 75,
    }),
];

export default function Suggestions({ tournament, mappool }: SuggestionsProps) {
    const suggestionPanel = (
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
                    <input
                        type="hidden"
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
    );

    const [data, setData] = useState<Suggestion[]>(mappool.suggestions);

    useEffect(() => {
        setData(mappool.suggestions);
    }, [mappool.suggestions]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="mb-4">{suggestionPanel}</div>
            <div className="container mx-auto py-10">
                <table>
                    <thead className="border-b bg-gray-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            className="py-2 text-center"
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
            </div>
        </>
    );
}
