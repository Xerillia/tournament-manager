import { destroy, update } from '@/routes/tournaments/suggestions';
import { Mappool } from '@/types/mappools';
import { Suggestion } from '@/types/suggestion';
import { Tournament } from '@/types/tournament';
import { router } from '@inertiajs/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CommentsCell from './comments-cell';
import { useEcho } from '@laravel/echo-react';
import { Comment, SuggestionComment } from '@/types/comments';

interface SuggestionTableProps {
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

export default function SuggestionTable({ mappool, tournament }: SuggestionTableProps) {
    useEcho('suggestion_comments.mappool.' + mappool.id, 'SuggestionCommentCreated', (e: { suggestionComment: SuggestionComment }) => {
        addNewComment(e);
    });

    useEcho('suggestion_comments.mappool.' + mappool.id, 'SuggestionCommentDeleted', (e: { suggestionComment: SuggestionComment }) => {
        removeComment(e);
    });

    useEcho('suggestion_comments.mappool.' + mappool.id, 'SuggestionCommentEdited', (e: { suggestionComment: SuggestionComment }) => {
        editComment(e);
    });

    const [data, setData] = useState<Suggestion[]>(mappool.suggestions);

    useEffect(() => {
        setData(mappool.suggestions);
    }, [mappool.suggestions]);

    function addNewComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = mappool.suggestions.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        // safe guard
        if (!suggestion) return;

        // check if the comment has already existed
        if (suggestion.comments.find((comment) => comment.comment.id === e.suggestionComment.comment_id)) return;

        // otherwise append it
        suggestion.comments.push({ id: e.suggestionComment.id, comment: e.suggestionComment.comment, parent: e.suggestionComment.parent });

        setSuggestionComments(suggestion);
    }

    function removeComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = mappool.suggestions.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        // safe guard
        if (!suggestion) return;

        // filter out the comment
        suggestion.comments = suggestion.comments.filter((comment) => comment.comment.id !== e.suggestionComment.comment_id);

        setSuggestionComments(suggestion);
    }

    function editComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = mappool.suggestions.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        // safe guard
        if (!suggestion) return;

        // find the edited comment index
        const commentIndex = suggestion.comments.findIndex((comment) => comment.comment.id === e.suggestionComment.comment_id);

        // safety
        if (!commentIndex) return;

        // set the edited comment
        suggestion.comments[commentIndex] = e.suggestionComment;

        setSuggestionComments(suggestion);
    }

    function setSuggestionComments(suggestion: Suggestion) {
        // find the index of the suggestion
        const index = mappool.suggestions.indexOf(suggestion);

        // get the data without the suggestion
        const excluded = mappool.suggestions.filter((value) => value.id !== suggestion.id);

        // update the state
        setData([
            ...excluded.slice(0, index), // elements before insertion index
            suggestion,
            ...excluded.slice(index), // elements after insertion index
        ]);
    }

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
            columnHelper.display({
                id: 'comments',
                header: 'Comments',
                cell: (props) => <CommentsCell props={props} />,
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
        [],
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
