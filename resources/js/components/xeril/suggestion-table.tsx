import { store } from '@/actions/App/Http/Controllers/SuggestionCommentController';
import { destroy, update } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Suggestion } from '@/types/suggestion';
import { Tournament } from '@/types/tournament';
import { router } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { SendIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface SuggestionTableProps<TData, TValue> {
    mappool: Mappool;
    tournament: Tournament;
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

export default function SuggestionTable<TData, TValue>({ mappool, tournament }: SuggestionTableProps<TData, TValue>) {
    const data = useMemo<Suggestion[]>(() => mappool.suggestions, [mappool]);

    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'delete_button',
                cell: (props) => (
                    <button
                        type="button"
                        className="rounded-md bg-red-200 p-1 align-middle hover:cursor-pointer hover:bg-red-300"
                        onClick={() => router.delete(destroy([tournament, props.row.original.id]))}
                    >
                        <Trash2Icon className="hover:text-700 text-red-800" />
                    </button>
                ),
            }),
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
                            mods: value.replace(/\s+/g, ''),
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
            columnHelper.display({
                id: 'comments',
                header: 'Comments',
                cell: (props) => {
                    const [show, setShow] = useState<boolean>(false);

                    const [message, setMessage] = useState<string>('');

                    function submitComment() {
                        if (!message) return;

                        router.post(
                            store(props.row.original.id),
                            {
                                message: message,
                            },
                            {
                                onSuccess: () => setMessage(''),
                            },
                        );
                    }

                    const [beingHeld, setBeingHeld] = useState<boolean>(false);
                    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
                        if (!e.shiftKey && e.key === 'Enter') {
                            e.preventDefault(); // do not insert linebreak unless Shift + Enter is pressed
                        }

                        if (beingHeld) return;

                        // enter
                        if (!e.shiftKey && e.key === 'Enter') {
                            setBeingHeld(true);
                            submitComment();
                        }

                        if (e.key === 'Escape') {
                            setShow(false);
                        }
                    }

                    function handleKeyUp() {
                        setBeingHeld(false);
                    }

                    function handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
                        const value = e.target.value;
                        e.target.value = '';
                        e.target.value = value;
                    }

                    const formattedDate = (datetime: string) => {
                        const date = new Date(datetime);

                        const today = new Date();
                        const isToday = today.toDateString() === date.toDateString();

                        today.setDate(today.getDate() - 1); // yesterday
                        const isYesterday = today.toDateString() === date.toDateString();

                        if (isToday) {
                            return date.toLocaleString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                        }

                        if (isYesterday) {
                            return (
                                'Yesterday at ' +
                                date.toLocaleString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                            );
                        }

                        return date.toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                    };

                    return (
                        <>
                            <button
                                type="button"
                                className="mx-2 flex items-center place-self-center rounded-md bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-300"
                                onClick={() => setShow(!show)}
                            >
                                <span className="whitespace-nowrap">
                                    {props.row.original.comments.length} comment{props.row.original.comments.length !== 1 ? 's' : ''}
                                </span>
                            </button>
                            {show && (
                                <>
                                    <div
                                        className="absolute top-0 left-0 z-1 h-screen w-screen bg-black/30"
                                        onClick={() => setShow(false)}
                                    />
                                    <div className="absolute top-1/2 left-1/2 z-2 flex w-180 -translate-1/2 flex-col rounded-md border border-gray-600 bg-white">
                                        <h2 className="my-2 border-b pb-2 text-2xl font-bold">Comments</h2>
                                        {props.row.original.comments.length > 0 ? (
                                            props.row.original.comments.map((value) => {
                                                const comment = value.comment;
                                                return (
                                                    <div
                                                        key={comment.id}
                                                        className="flex place-items-center gap-2 p-2 text-left hover:bg-black/5"
                                                    >
                                                        <img
                                                            src={comment.user.avatar_url}
                                                            className="h-10 w-10 rounded-full"
                                                        />
                                                        <div className="flex flex-col">
                                                            <p className="font-bold">
                                                                {comment.user.username}{' '}
                                                                <span className="ml-1 text-sm font-normal text-black/80">
                                                                    {formattedDate(comment.created_at)}
                                                                </span>
                                                            </p>
                                                            <p>{comment.message}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="my-12 text-gray-400">
                                                No comments found. <br />
                                                Start commenting!
                                            </p>
                                        )}
                                        <div className="mt-2 flex items-end-safe gap-2 border-t p-2">
                                            <img
                                                src={props.row.original.user.avatar_url}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <TextareaAutosize
                                                value={message}
                                                placeholder="enter a comment..."
                                                className="flex-1 resize-none self-center overflow-y-auto focus:outline-0"
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDownCapture={handleKeyDown}
                                                onKeyUp={handleKeyUp}
                                                autoFocus
                                                onFocus={handleFocus}
                                                maxRows={8}
                                            />
                                            <button
                                                type="button"
                                                className="grid h-8 w-8 place-items-center rounded-sm bg-blue-400 p-0.5 hover:cursor-pointer hover:bg-blue-300"
                                                onClick={submitComment}
                                            >
                                                <SendIcon
                                                    className="size-5"
                                                    color="#fff"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    );
                },
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
    );
}
