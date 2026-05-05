import { Mappool, Slot } from '@/types/mappools';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import CommentsCell from './comments-cell';
import { useEcho } from '@laravel/echo-react';
import { SuggestionComment } from '@/types/comments';
import TagsCell from './tags-cell';
import { useDragDropMonitor, useDroppable } from '@dnd-kit/react';
import { router } from '@inertiajs/react';
import { insertSuggestionToSlot } from '@/routes/suggestion/slot';

interface AssemblyTableProps {
    mappool: Mappool;
    slots: Slot[];
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

const columnHelper = createColumnHelper<Slot>();

export default function AssemblyTable({ mappool, slots }: AssemblyTableProps) {
    useEcho('mappools.' + mappool.id + '.suggestions', 'SuggestionCommentCreated', (e: { suggestionComment: SuggestionComment }) => {
        console.log(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'SuggestionCommentDeleted', (e: { suggestionComment: SuggestionComment }) => {
        console.log(e);
    });

    useDragDropMonitor({
        onDragEnd(event) {
            const { operation } = event;

            if (operation.target) {
                router.post(insertSuggestionToSlot([Number(operation.source?.id), Number(operation.target.id)]));
            }
        },
    });

    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'droppable',
                header: 'Drop Zone',
                cell: (props) => {
                    const { ref } = useDroppable({
                        id: props.row.original.id,
                    });
                    return (
                        <div
                            ref={ref}
                            className="p-2"
                        >
                            Zone
                        </div>
                    );
                },
            }),
            columnHelper.accessor('slot', {
                header: 'Slot',
            }),
            columnHelper.accessor('suggestion.beatmap.beatmap_id', {
                header: 'Beatmap ID',
                cell: (props) => props.row.original.suggestion?.beatmap.beatmap_id,
            }),
            columnHelper.accessor('suggestion.beatmap.mods', {
                header: 'Mods',
                cell: (props) => props.row.original.suggestion?.beatmap.mods,
            }),
            columnHelper.display({
                id: 'comments',
                header: 'Comments',
                cell: (props) => <CommentsCell suggestion={props.row.original.suggestion} />,
            }),
            columnHelper.display({
                id: 'tags',
                header: 'Tags',
                cell: (props) =>
                    props.row.original.suggestion ? (
                        <TagsCell
                            suggestionId={props.row.original.suggestion.id}
                            originalTags={props.row.original.suggestion.tags}
                            showButton={false}
                        />
                    ) : null,
            }),
            columnHelper.accessor((row) => row.suggestion.beatmap, {
                id: 'banner',
                header: 'Banner',
                cell: (props) =>
                    props.row.original.suggestion ? <img src={`https://assets.ppy.sh/beatmaps/${props.getValue().beatmapset_id}/covers/cover.jpg`} /> : null,
            }),
            columnHelper.accessor((row) => row.suggestion?.beatmap, {
                id: 'beatmap_name',
                header: 'Beatmap',
                cell: (props) =>
                    props.row.original.suggestion ? (
                        <a
                            href={`https://osu.ppy.sh/beatmapsets/${props.getValue().beatmapset_id}#${props.getValue().mode}/${props.getValue().beatmap_id}`}
                            className="whitespace-nowrap underline hover:cursor-pointer"
                        >
                            {`${props.getValue().artist} - ${props.getValue().title} [${props.getValue().version}]`}
                        </a>
                    ) : null,
                size: 800,
            }),
            columnHelper.accessor('suggestion.beatmap.star_rating', {
                header: 'SR',
                cell: (props) => {
                    props.row.original.suggestion ? <span className="whitespace-nowrap">{`${props.getValue().toFixed(2)} ★`}</span> : null;
                },
                size: 75,
            }),
            columnHelper.accessor('suggestion.beatmap.bpm', {
                header: 'BPM',
                cell: (props) => (props.row.original.suggestion ? +props.getValue().toFixed(2) : null),
                size: 75,
            }),
            columnHelper.accessor('suggestion.beatmap.max_combo', {
                header: 'Max Combo',
                cell: (props) => (props.row.original.suggestion ? `${props.getValue()}x` : null),
            }),
            columnHelper.accessor('suggestion.beatmap.drain', {
                header: 'Drain',
                cell: (props) => (props.row.original.suggestion ? secondToTime(props.getValue()) : null),
                size: 75,
            }),
            columnHelper.accessor('suggestion.beatmap.cs', {
                header: 'CS',
                cell: (props) => (props.row.original.suggestion ? +props.getValue().toFixed(2) : null),
                size: 75,
            }),
            columnHelper.accessor('suggestion.beatmap.ar', {
                header: 'AR',
                cell: (props) => (props.row.original.suggestion ? +props.getValue().toFixed(2) : null),
                size: 75,
            }),
            columnHelper.accessor('suggestion.beatmap.od', {
                header: 'OD',
                cell: (props) => (props.row.original.suggestion ? +props.getValue().toFixed(2) : null),
                size: 75,
            }),
        ],
        [],
    );

    const [data, setData] = useState<Slot[]>(slots);

    useEffect(() => {
        setData(slots);
    }, [slots]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-2 text-center text-4xl font-bold">Assembly Zone</h1>
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
    );
}
