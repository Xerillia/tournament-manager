import { deleteSuggestion, updateSuggestion } from '@/routes/suggestions';
import { Suggestion } from '@/types/suggestion';
import { router } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CommentsCell from './comments-cell';
import { BeatmapTag } from '@/types/beatmaptag';
import TagsCell from './tags-cell';
import { useDraggable } from '@dnd-kit/react';
import { ArrowUpIcon, ArrowDownIcon, ChevronsUpDownIcon } from 'lucide-react';
import TagsHeader, { TagFilter } from './tags-header';
import MapPreviewer from './map-previewer';
import { Mode, ModeUtils } from '@/enums';

interface SuggestionTableProps {
    tags: BeatmapTag[];
    suggestions: Suggestion[];
    handleTagFilters: (tagFilters: TagFilter[]) => void;
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

export default function SuggestionTable({ tags, suggestions, handleTagFilters }: SuggestionTableProps) {
    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'delete_button',
                header: ({ table }) => (
                    <button
                        type="button"
                        className="hover- -mx-2 -my-5 h-16 w-24 cursor-pointer text-red-600 hover:bg-black/10"
                        onClick={() => table.resetSorting()}
                    >
                        Clear Sort
                    </button>
                ),
                cell: (props) => (
                    <button
                        type="button"
                        className="hover:text-700 flex justify-self-center rounded-md bg-red-200 p-1 align-middle font-medium whitespace-nowrap text-red-800 hover:cursor-pointer hover:bg-red-300"
                        onClick={() => router.delete(deleteSuggestion(props.row.original.id))}
                    >
                        <Trash2Icon /> Delete
                    </button>
                ),
            }),
            columnHelper.display({
                id: 'preview_button',
                header: 'Preview',
                cell: (props) => (
                    <MapPreviewer
                        beatmap_id={props.row.original.beatmap.beatmap_id}
                        mods={props.row.original.beatmap.mods}
                    />
                ),
            }),
            columnHelper.accessor('beatmap.beatmap_id', {
                header: 'Beatmap ID',
                cell: (props) => {
                    const [value, setValue] = useState<number>(props.getValue());
                    const [originalValue, setOriginalValue] = useState<number>(props.getValue());

                    useEffect(() => {
                        setValue(props.getValue());
                        setOriginalValue(props.getValue());
                    }, [props]);

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

                        router.put(updateSuggestion(suggestion_id), data, {
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
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.mode', {
                header: 'Mode',
                cell: (props) => <p>{ModeUtils.label(props.row.original.beatmap.mode)}</p>,
            }),
            columnHelper.accessor('beatmap.mods', {
                header: 'Mods',
                cell: (props) => {
                    const [value, setValue] = useState<string>(props.getValue());
                    const [originalValue, setOriginalValue] = useState<string>(props.getValue());

                    useEffect(() => {
                        setValue(props.getValue());
                        setOriginalValue(props.getValue());
                    }, [props]);

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
                            mods: value.replace(/\s+/g, ''),
                        };

                        // route param
                        const suggestion_id = props.row.original.id;

                        router.put(updateSuggestion(suggestion_id), data, {
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
                cell: (props) => (
                    <a
                        href={`https://osu.ppy.sh/users/${props.row.original.user.osu_id}`}
                        target="_blank"
                        className="hover:underline"
                    >
                        {props.getValue()}
                    </a>
                ),
            }),
            columnHelper.accessor('id', {
                // hacking by using `accessor` instead of `display` is necessary to use sorting :/ , misuse but it works lol.
                id: 'comments',
                header: 'Comments',
                cell: (props) => <CommentsCell suggestion={props.row.original} />,
                sortingFn: (rowA, rowB) => {
                    const first = rowA.original.comments.at(-1);
                    const second = rowB.original.comments.at(-1);
                    if (!second) return 1;
                    if (!first) return -1;
                    return new Date(first.comment.updated_at).getTime() - new Date(second.comment.updated_at).getTime();
                },
                meta: {
                    tooltip: 'Sort by latest comment updated or created',
                },
            }),
            columnHelper.display({
                id: 'tags',
                header: () => (
                    <TagsHeader
                        tags={tags}
                        handleTagFilters={handleTagFilters}
                    />
                ),
                cell: (props) => (
                    <TagsCell
                        suggestionId={props.row.original.id}
                        originalTags={props.row.original.tags}
                        tags={tags}
                    />
                ),
            }),
            columnHelper.accessor((row) => row.beatmap, {
                id: 'banner',
                header: 'Banner',
                cell: (props) => <img src={`https://assets.ppy.sh/beatmaps/${props.getValue().beatmapset_id}/covers/cover.jpg`} />,
                enableSorting: false,
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
                sortingFn: (rowA, rowB) => {
                    const first = rowA.original.beatmap.artist + rowA.original.beatmap.title + rowA.original.beatmap.version;
                    const second = rowB.original.beatmap.artist + rowB.original.beatmap.title + rowB.original.beatmap.version;
                    return first.localeCompare(second);
                },
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.star_rating', {
                header: 'SR',
                cell: (props) => <span className="whitespace-nowrap">{`${props.getValue().toFixed(2)} ★`}</span>,
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.bpm', {
                header: 'BPM',
                cell: (props) => +props.getValue().toFixed(2),
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.max_combo', {
                header: 'Max Combo',
                cell: (props) => `${props.getValue()}x`,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.drain', {
                header: 'Drain',
                cell: (props) => secondToTime(props.getValue()),
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.cs', {
                header: 'CS',
                cell: (props) => +props.getValue().toFixed(2),
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.ar', {
                header: 'AR',
                cell: (props) => +props.getValue().toFixed(2),
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.accessor('beatmap.od', {
                header: 'OD',
                cell: (props) => +props.getValue().toFixed(2),
                size: 75,
                sortDescFirst: false,
            }),
            columnHelper.display({
                id: 'draggable',
                header: 'Drag Button',
                cell: (props) => {
                    const { ref } = useDraggable({
                        id: props.row.original.id,
                    });

                    return (
                        <button
                            ref={ref}
                            className="cursor-grab rounded-sm bg-gray-800 p-0.5 text-nowrap text-white"
                        >
                            Drag
                        </button>
                    );
                },
            }),
        ],
        [],
    );

    const table = useReactTable({
        data: suggestions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="container mx-auto mt-6">
            <table>
                <thead className="border-b bg-gray-300">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        className="text-center"
                                        style={{
                                            width: header.column.getSize(),
                                        }}
                                        title={header.column.columnDef.meta?.tooltip}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    (header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-black/10 ' : '') +
                                                    'flex items-center justify-center px-2 py-5 whitespace-nowrap'
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {(header.column.getCanSort() &&
                                                    { asc: <ArrowUpIcon />, desc: <ArrowDownIcon /> }[header.column.getIsSorted() as string]) ?? (
                                                    <ChevronsUpDownIcon />
                                                )}
                                            </div>
                                        )}
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
    );
}
