import { useEffect, useRef, useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/SuggestionCommentController';
import { router, usePage } from '@inertiajs/react';
import { Comment, SuggestionComment } from '@/types/comments';
import { deleteSuggestionComment, updateSuggestionComment } from '@/routes/suggestions/comments';
import { CircleXIcon, PencilIcon, ReplyIcon, SendIcon, TrashIcon, XIcon } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Suggestion } from '@/types/suggestion';

interface CommentCellProps {
    suggestion: Suggestion;
}

export default function CommentsCell({ suggestion }: CommentCellProps) {
    if (!suggestion) return;

    const { auth } = usePage().props;

    const [show, setShow] = useState<boolean>(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [show]);

    const [message, setMessage] = useState<string>('');

    function handleStore() {
        if (!message) return;

        setMessage('');
        setReplyingTo(null);

        router.post(
            store(suggestion.id),
            {
                message: message,
                parent_id: replyingTo?.id,
            },
            {
                onSuccess: () => {
                    bottomRef.current?.scrollIntoView();
                },
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
            handleStore();
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

    const formattedDate = (datetime: Date) => {
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

    const [editId, setEditId] = useState<number>(NaN);
    const [editMessage, setEditMessage] = useState<string>('');

    function toggleEdit(comment: Comment) {
        setEditId(comment.id);
        setEditMessage(comment.message);
    }

    function handleUpdate() {
        resetEdit();
        router.put(updateSuggestionComment([suggestion.id, editId]), {
            message: editMessage,
        });
        textAreaInput.current?.focus();
    }

    function resetEdit() {
        setEditId(NaN);
        setEditMessage('');
    }

    function closeModal() {
        setShow(false);
        resetEdit();
    }

    function handleKeyDownEdit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault(); // do not insert linebreak unless Shift + Enter is pressed
        }

        if (beingHeld) return;

        // enter
        if (!e.shiftKey && e.key === 'Enter') {
            setBeingHeld(true);
            handleUpdate();
        }

        if (e.key === 'Escape') {
            resetEdit();
        }
    }

    function handleDelete(comment: Comment) {
        router.delete(deleteSuggestionComment([suggestion.id, comment.id]));
        textAreaInput.current?.focus();
    }

    const [replyingTo, setReplyingTo] = useState<SuggestionComment | null>(null);

    function handleReply(suggestionComment: SuggestionComment) {
        setReplyingTo(suggestionComment);
        textAreaInput.current?.focus();
    }

    const textAreaInput = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <button
                type="button"
                className="mx-2 flex items-center place-self-center rounded-md bg-gray-200 p-1 hover:cursor-pointer hover:bg-gray-300"
                onClick={() => setShow(true)}
            >
                <span className="whitespace-nowrap">
                    {suggestion.comments.length} comment{suggestion.comments.length !== 1 ? 's' : ''}
                </span>
            </button>
            {show && (
                <>
                    <div
                        className="fixed top-0 left-0 z-1 h-full w-full overflow-hidden bg-black/30"
                        onClick={closeModal}
                    />
                    <div className="absolute top-1/2 left-1/2 z-2 flex w-180 -translate-1/2 flex-col rounded-md border border-gray-600 bg-white">
                        <div className="relative flex items-center justify-center border-b py-2">
                            <h2 className="text-2xl font-bold">
                                Comments in: {suggestion.beatmap.beatmap_id} - {suggestion.beatmap.mods}
                            </h2>
                            <button
                                type="button"
                                className="absolute right-1.5 rounded-md p-0.5 hover:cursor-pointer hover:bg-black/10"
                                onClick={closeModal}
                            >
                                <XIcon color="#999" />
                            </button>
                        </div>
                        <div className="max-h-192 overflow-y-auto">
                            {suggestion.comments.length > 0 ? (
                                suggestion.comments.map((value) => {
                                    const comment = value.comment;
                                    const parent = value.parent?.comment;
                                    return (
                                        <div
                                            key={comment.id}
                                            className={
                                                (replyingTo?.comment.id === comment.id ? 'border-l-2 border-blue-400 bg-blue-100 ' : 'hover:bg-black/5 ') +
                                                'flex flex-col p-2 text-left'
                                            }
                                        >
                                            {parent && (
                                                <div className="flex items-center gap-1 text-sm">
                                                    <p className="mb-0.5 ml-12">replying to</p>
                                                    <img
                                                        src={parent.user.avatar_url}
                                                        className="h-5 w-5 flex-none rounded-full"
                                                    />
                                                    <p className="font-semibold">{parent.user.username}</p>
                                                    <p>{parent.message}</p>
                                                    {parent.created_at != parent.updated_at && <span className="text-sm">(edited)</span>}
                                                </div>
                                            )}
                                            <div className="group relative flex place-items-start gap-2">
                                                <a
                                                    href={`https://osu.ppy.sh/users/${comment.user.osu_id}`}
                                                    target="_blank"
                                                    className="flex-none"
                                                >
                                                    <img
                                                        src={comment.user.avatar_url}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                </a>
                                                <div className="flex w-full flex-col">
                                                    <p>
                                                        <a
                                                            href={`https://osu.ppy.sh/users/${comment.user.osu_id}`}
                                                            target="_blank"
                                                            className="font-bold hover:underline"
                                                        >
                                                            {comment.user.username}
                                                        </a>
                                                        <span className="ml-1 text-sm text-black/80">{formattedDate(comment.created_at)}</span>
                                                        {comment.created_at != comment.updated_at && <span className="ml-1 text-xs">(edited)</span>}
                                                    </p>
                                                    {editId !== comment.id ? (
                                                        <p className="whitespace-pre-wrap">{comment.message}</p>
                                                    ) : (
                                                        <>
                                                            <TextareaAutosize
                                                                name={`messages[${comment.id}][message]`}
                                                                value={editMessage}
                                                                className="mt-1 mr-4 h-20 resize-none overflow-y-auto rounded-md border border-black/80 p-2 focus:outline-0"
                                                                onChange={(e) => setEditMessage(e.target.value)}
                                                                onKeyDown={handleKeyDownEdit}
                                                                onKeyUp={handleKeyUp}
                                                                autoFocus
                                                                onFocus={handleFocus}
                                                                maxRows={8}
                                                            />
                                                            <p className="align-middle text-xs">
                                                                escape to{' '}
                                                                <button
                                                                    type="button"
                                                                    className="text-blue-500 hover:cursor-pointer hover:underline"
                                                                    onClick={resetEdit}
                                                                >
                                                                    cancel
                                                                </button>{' '}
                                                                &bull; enter to{' '}
                                                                <button
                                                                    type="button"
                                                                    className="text-blue-500 hover:cursor-pointer hover:underline"
                                                                    onClick={handleUpdate}
                                                                >
                                                                    save
                                                                </button>
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                {!editId && (
                                                    <div className="absolute right-6 bottom-1/2 z-10 hidden items-center gap-0.5 rounded-md border bg-white p-0.5 group-hover:flex">
                                                        {comment.user.id === auth.user.id && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md p-1 hover:cursor-pointer hover:bg-black/20"
                                                                    onClick={() => handleReply(value)}
                                                                >
                                                                    <ReplyIcon
                                                                        className="size-5"
                                                                        color="#000"
                                                                    />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md p-1 hover:cursor-pointer hover:bg-black/20"
                                                                    onClick={() => toggleEdit(comment)}
                                                                >
                                                                    <PencilIcon
                                                                        className="size-5"
                                                                        color="#000"
                                                                    />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md p-1 hover:cursor-pointer hover:bg-black/20"
                                                                    onClick={() => handleDelete(comment)}
                                                                >
                                                                    <TrashIcon
                                                                        className="size-5"
                                                                        color="#000"
                                                                    />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
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
                            {/* dummy div to scroll to the bottom */}
                            <div ref={bottomRef} />
                        </div>
                        <div className="mt-4">
                            {replyingTo && (
                                <div className="flex justify-between rounded-t bg-gray-300 py-2 pr-2 pl-4 text-left">
                                    <p>
                                        Replying to <span className="font-bold">{replyingTo?.comment.user.username}</span>
                                    </p>
                                    <button
                                        className="px-2 hover:cursor-pointer"
                                        onClick={() => setReplyingTo(null)}
                                    >
                                        <CircleXIcon className="size-5 text-black hover:text-gray-600" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-end-safe gap-2 border-t p-2">
                                <img
                                    src={auth.user.avatar_url}
                                    className="h-8 w-8 rounded-full"
                                />
                                <TextareaAutosize
                                    ref={textAreaInput}
                                    name={`suggestions[${suggestion.id}][message]`}
                                    value={message}
                                    placeholder="enter a comment..."
                                    className="flex-1 resize-none self-center overflow-y-auto focus:outline-0"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onKeyUp={handleKeyUp}
                                    autoFocus
                                    onFocus={handleFocus}
                                    maxRows={8}
                                />
                                <button
                                    type="button"
                                    className="grid h-8 w-8 place-items-center rounded-sm bg-blue-400 p-0.5 hover:cursor-pointer hover:bg-blue-300"
                                    onClick={handleStore}
                                >
                                    <SendIcon
                                        className="size-5"
                                        color="#fff"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
