import { Mappool, Slot } from '@/types/mappools';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import CommentsCell from './comments-cell';
import TagsCell from './tags-cell';
import { useDragDropMonitor, useDroppable } from '@dnd-kit/react';
import { Form, router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { disableFreemod, insertSuggestionToSlot, reenableFreemod, removeSuggestionFromSlot } from '@/routes/slots';
import { overrideFreemodRules } from '@/routes/tournaments/pooling/slots/override';

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
    useDragDropMonitor({
        onDragEnd(event) {
            const { operation } = event;
            if (operation.target) {
                const suggestion = Number(operation.source?.id);
                const slot = Number(operation.target.id);
                router.post(insertSuggestionToSlot({ suggestion: suggestion, slot: slot }));
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
            columnHelper.display({
                id: 'removeSuggestion',
                cell: (props) =>
                    props.row.original.suggestion ? (
                        <button
                            type="button"
                            className="rounded-md bg-red-200 p-0.5 text-red-800 hover:cursor-pointer hover:bg-red-300"
                            onClick={() => router.delete(removeSuggestionFromSlot([Number(props.row.original.id)]))}
                        >
                            <Trash2Icon />
                        </button>
                    ) : (
                        <></>
                    ),
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
                cell: (props) => {
                    const slot = props.row.original;
                    const mods = slot.suggestion?.beatmap.mods;

                    if (!mods) return null; // empty cell

                    if (slot.is_freemod) {
                        const [showModal, setShowModal] = useState<boolean>(false);

                        return (
                            <>
                                {showModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                                        <Form
                                            className="w-xl rounded-md bg-white shadow-md"
                                            action={overrideFreemodRules(slot)}
                                            method="POST"
                                            onSuccess={() => setShowModal(false)}
                                        >
                                            <h1 className="mx-4 border-b py-4 pb-2 text-2xl font-bold">Override Freemod Multipliers</h1>
                                            {!slot.freemod_disabled ? (
                                                <button
                                                    type="button"
                                                    className="m-2 cursor-pointer rounded-md bg-red-300 p-2 hover:bg-red-200"
                                                    onClick={() => router.post(disableFreemod(slot))}
                                                >
                                                    Disable Freemod for this Slot?
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="m-2 cursor-pointer rounded-md bg-green-300 p-2 hover:bg-green-200"
                                                    onClick={() => router.post(reenableFreemod(slot))}
                                                >
                                                    Reenable Freemod for this Slot?
                                                </button>
                                            )}
                                            {!slot.freemod_disabled ? (
                                                <>
                                                    <div className="flex flex-col">
                                                        <div className="flex text-lg font-semibold">
                                                            <p className="flex-1">Mod</p>
                                                            <p className="flex-1">Multiplier</p>
                                                        </div>
                                                        {mappool.freemod_rules.map((rule) => {
                                                            const overriddenRules = slot.freemod_rules?.find((override) => override.mod === rule.mod);

                                                            return (
                                                                <div
                                                                    key={rule.id}
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        type="hidden"
                                                                        name={`rules[${rule.id}][mod]`}
                                                                        value={rule.mod}
                                                                    />
                                                                    <div className="flex-1">{rule.mod}</div>
                                                                    <input
                                                                        type="number"
                                                                        name={`rules[${rule.id}][multiplier]`}
                                                                        defaultValue={overriddenRules?.multiplier ?? rule.multiplier}
                                                                        step={0.01}
                                                                        className="flex-1 py-2 text-center focus:outline-0"
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="flex h-10">
                                                        <button
                                                            type="submit"
                                                            className="flex-1 cursor-pointer rounded-bl bg-green-300 hover:bg-green-200"
                                                        >
                                                            Override
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="flex-1 cursor-pointer rounded-br bg-red-300 hover:bg-red-200"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="mx-auto my-12">Freemod is disabled.</p>
                                                    <button
                                                        type="button"
                                                        className="h-10 w-full cursor-pointer rounded-br bg-blue-300 hover:bg-blue-200"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                </>
                                            )}
                                        </Form>
                                    </div>
                                )}
                                <button
                                    className="cursor-pointer rounded-md bg-slate-700 p-1 text-white hover:bg-slate-500"
                                    onClick={() => setShowModal(true)}
                                >
                                    {mods}
                                </button>
                            </>
                        );
                    }

                    return mods;
                },
            }),
            columnHelper.display({
                id: 'comments',
                header: 'Comments',
                cell: (props) => (props.row.original.suggestion ? <CommentsCell suggestion={props.row.original.suggestion} /> : null),
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
                cell: (props) => (props.row.original.suggestion ? <span className="whitespace-nowrap">{`${props.getValue().toFixed(2)} ★`}</span> : null),
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

    const table = useReactTable({
        data: slots,
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
