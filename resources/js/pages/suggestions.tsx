import { store, update } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Suggestion } from '@/types/suggestion';
import { Tournament } from '@/types/tournament';
import { Form, router, usePage } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

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

export default function Suggestions({ tournament, mappool }: SuggestionsProps) {
    const { flash } = usePage().props;

    const suggestionPanel = (
        <>
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

    const data = useMemo<Suggestion[]>(() => mappool.suggestions, [mappool]);

    const columns = useMemo(
        () => [
            columnHelper.accessor('beatmap.beatmap_id', {
                header: 'Beatmap ID',
                cell: (props) => {
                    const [value, setValue] = useState<number>(props.getValue());
                    const [originalValue, setOriginalValue] = useState<number>(props.getValue());

                    const [error, setError] = useState<string>('');

                    useEffect(() => {
                        if (!error) return;

                        // Clear error after 3 seconds
                        const timer = setTimeout(() => {
                            setError('');
                        }, 3000);

                        return () => clearTimeout(timer);
                    });

                    function updateBeatmapId() {
                        // don't update if there is no change
                        if (value === originalValue) return;

                        // prepare payload
                        const data = {
                            beatmap_id: value,
                            mods: props.row.original.beatmap.mods,
                        };

                        // route param
                        const suggestion_id = props.row.original.id;

                        router.put(update([tournament, suggestion_id]), data, {
                            onError: (error) => {
                                setError(error.beatmap_not_found);
                                setValue(originalValue);
                            },
                            onSuccess: () => {
                                setOriginalValue(value);
                            },
                        });
                    }

                    function resetOrUnfocus(e: React.KeyboardEvent<HTMLInputElement>) {
                        if (value === originalValue) {
                            e.currentTarget.blur();
                        }

                        setValue(originalValue);
                    }

                    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
                        if (e.key === 'Escape') resetOrUnfocus(e);
                        if (e.key === 'Enter') e.currentTarget.blur();
                    }

                    return (
                        <>
                            <input
                                type="number"
                                name={`beatmap_id[${props.row.original.id}]`}
                                value={value}
                                className="block h-full w-36 text-center focus:outline-blue-500"
                                onChange={(e) => setValue(Number(e.target.value))}
                                onKeyDown={(e) => handleKeyDown(e)}
                                onBlur={updateBeatmapId}
                            />
                            {error && <div className="absolute -top-17 bg-red-200 px-2 text-sm font-bold whitespace-nowrap text-red-500">{error}</div>}
                        </>
                    );
                },
            }),
            columnHelper.accessor('beatmap.mods', {
                header: 'Mods',
                cell: (props) => {
                    const [value, setValue] = useState<string>(props.getValue());
                    const [originalValue, setOriginalValue] = useState<string>(props.getValue());

                    const [error, setError] = useState<string>('');

                    useEffect(() => {
                        if (!error) return;

                        // Clear error after 3 seconds
                        const timer = setTimeout(() => {
                            setError('');
                        }, 3000);

                        return () => clearTimeout(timer);
                    });

                    function updateMod() {
                        // don't update if there is no change
                        if (value === originalValue) return;

                        // prepare payload
                        const data = {
                            beatmap_id: props.row.original.beatmap.beatmap_id,
                            mods: value,
                        };

                        // route param
                        const suggestion_id = props.row.original.id;

                        router.put(update([tournament, suggestion_id]), data, {
                            onError: (error) => {
                                setError(error.mods);
                                setValue(originalValue);
                            },
                            onSuccess: () => {
                                setOriginalValue(value);
                            },
                        });
                    }

                    function resetOrUnfocus(e: React.KeyboardEvent<HTMLInputElement>) {
                        if (value === originalValue) {
                            e.currentTarget.blur();
                        }

                        setValue(originalValue);
                    }

                    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
                        if (e.key === 'Escape') resetOrUnfocus(e);
                        if (e.key === 'Enter') e.currentTarget.blur();
                    }

                    return (
                        <div className="relative h-full w-full">
                            <input
                                type="text"
                                name={`mods[${props.row.original.id}]`}
                                value={value}
                                className="block h-full w-full text-center focus:outline-blue-500"
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                onBlur={updateMod}
                            />
                            {error && <div className="absolute -top-5.25 z-1 bg-red-200 px-2 text-sm font-bold whitespace-nowrap text-red-500">{error}</div>}
                        </div>
                    );
                },
            }),
            columnHelper.accessor('user.username', {
                header: 'Suggester',
                size: 200,
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
                cell: (props) => <span className="whitespace-nowrap">{`${props.getValue().toFixed(2)} ★`}</span>,
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
        ],
        [mappool],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="mb-4">{suggestionPanel}</div>
            <div className="container mx-auto py-10">
                <h1 className="mb-2 text-center text-4xl font-bold">{mappool.round} Suggestions</h1>
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
