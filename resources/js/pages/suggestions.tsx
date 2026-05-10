import AssemblyTable from '@/components/xeril/assembly-table';
import SuggestionTable from '@/components/xeril/suggestion-table';
import { addSuggestion } from '@/routes/mappools';
import { BeatmapTag } from '@/types/beatmaptag';
import { SuggestionComment } from '@/types/comments';
import { Mappool, Slot } from '@/types/mappools';
import { Suggestion } from '@/types/suggestion';
import { Tournament } from '@/types/tournament';
import { DragDropProvider } from '@dnd-kit/react';
import { Form, usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useState } from 'react';

interface SuggestionsProps {
    tournament: Tournament;
    mappool: Mappool;
    tags: BeatmapTag[];
    slots: Slot[];
}

export default function Suggestions({ tournament, mappool, tags, slots }: SuggestionsProps) {
    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSuggestionCreated', (e: { mappoolSuggestion: Suggestion }) => {
        insertSuggestion(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSuggestionEdited', (e: { mappoolSuggestion: Suggestion }) => {
        editSuggestion(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSuggestionDeleted', (e: { mappoolSuggestion: Suggestion }) => {
        removeSuggestion(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'SuggestionCommentCreated', (e: { suggestionComment: SuggestionComment }) => {
        addNewComment(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'SuggestionCommentDeleted', (e: { suggestionComment: SuggestionComment }) => {
        removeComment(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'SuggestionCommentEdited', (e: { suggestionComment: SuggestionComment }) => {
        editComment(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSuggestionTagAdded', (e: { beatmapTag: BeatmapTag; mappoolSuggestion: Suggestion }) => {
        addTagToBeatmap(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSuggestionTagRemoved', (e: { beatmapTag: BeatmapTag; mappoolSuggestion: Suggestion }) => {
        removeTagFromBeatmap(e);
    });

    useEcho('mappools.' + mappool.id + '.suggestions', 'MappoolSlotUpdated', (e: { slot: Slot }) => {
        updateSlot(e);
    });

    const [suggestionsState, setSuggestionsState] = useState<Suggestion[]>(mappool.suggestions);

    function updateSuggestionState(suggestion: Suggestion) {
        // update the state
        setSuggestionsState((prevState) => {
            // find the index of the suggestion
            const index = prevState.indexOf(suggestion);

            // get the data without the suggestion
            const excluded = prevState.filter((value) => value.id !== suggestion.id);

            return [
                ...excluded.slice(0, index), // elements before insertion index
                suggestion,
                ...excluded.slice(index), // elements after insertion index
            ];
        });
    }

    function insertSuggestion(e: { mappoolSuggestion: Suggestion }) {
        setSuggestionsState((prevState) => [...prevState, e.mappoolSuggestion]);
    }

    function editSuggestion(e: { mappoolSuggestion: Suggestion }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.mappoolSuggestion.id);

        if (suggestion) {
            suggestion.beatmap_id = e.mappoolSuggestion.beatmap_id;
            suggestion.beatmap = e.mappoolSuggestion.beatmap;

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slotsState.filter((slot) => slot.suggestion?.id === e.mappoolSuggestion.id);

        foundSlots.map((slot) => {
            slot.suggestion.beatmap_id = e.mappoolSuggestion.beatmap_id;
            slot.suggestion.beatmap = e.mappoolSuggestion.beatmap;

            updateSlotsState(slot);
        });
    }

    function removeSuggestion(e: { mappoolSuggestion: Suggestion }) {
        setSuggestionsState((prevState) => prevState.filter((suggestion) => suggestion.id !== e.mappoolSuggestion.id));
    }

    function addNewComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        // build the comment
        const comment = { id: e.suggestionComment.id, comment: e.suggestionComment.comment, parent: e.suggestionComment.parent };

        // if suggestion exists and the comment hasn't already existed
        if (suggestion && !suggestion.comments.find((comment) => comment.comment.id === e.suggestionComment.comment_id)) {
            // push
            suggestion.comments.push(comment);

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slotsState.filter((slot) => slot.suggestion?.id === e.suggestionComment.mappool_suggestion_id);

        foundSlots.map((slot) => {
            slot.suggestion.comments = [...slot.suggestion.comments, comment];
        });
    }

    function removeComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        if (suggestion) {
            // filter out the comment
            suggestion.comments = suggestion.comments.filter((comment) => comment.comment.id !== e.suggestionComment.comment_id);

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slots.filter((slot) => slot.suggestion?.id === e.suggestionComment.mappool_suggestion_id);

        foundSlots.map((slot) => {
            slot.suggestion.comments = slot.suggestion.comments.filter((comment) => comment.comment.id !== e.suggestionComment.comment_id);
        });
    }

    function editComment(e: { suggestionComment: SuggestionComment }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.suggestionComment.mappool_suggestion_id);

        if (suggestion) {
            // find the edited comment index
            const commentIndex = suggestion.comments.findIndex((comment) => comment.comment.id === e.suggestionComment.comment_id);

            // set the edited comment
            suggestion.comments[commentIndex] = e.suggestionComment;

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slots.filter((slot) => slot.suggestion?.id === e.suggestionComment.mappool_suggestion_id);

        foundSlots.map((slot) => {
            // find the edited comment index
            const commentIndex = slot.suggestion.comments.findIndex((comment) => comment.comment.id === e.suggestionComment.comment_id);

            slot.suggestion.comments[commentIndex] = e.suggestionComment;
        });
    }

    function addTagToBeatmap(e: { beatmapTag: BeatmapTag; mappoolSuggestion: Suggestion }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.mappoolSuggestion.id);

        if (suggestion) {
            // update the tags
            suggestion.tags = [...suggestion.tags, e.beatmapTag];

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slots.filter((slot) => slot.suggestion?.id === e.mappoolSuggestion.id);

        foundSlots.map((slot) => {
            slot.suggestion.tags = [...slot.suggestion.tags, e.beatmapTag];
        });
    }

    function removeTagFromBeatmap(e: { beatmapTag: BeatmapTag; mappoolSuggestion: Suggestion }) {
        // find the suggestion
        const suggestion = suggestionsState.find((suggestion) => suggestion.id === e.mappoolSuggestion.id);

        if (suggestion) {
            // update the tags
            suggestion.tags = suggestion.tags.filter((tag) => tag.id !== e.beatmapTag.id);

            updateSuggestionState(suggestion);
        }

        // find the slots
        const foundSlots = slots.filter((slot) => slot.suggestion?.id === e.mappoolSuggestion.id);

        foundSlots.map((slot) => {
            slot.suggestion.tags = slot.suggestion.tags.filter((tag) => tag.id !== e.beatmapTag.id);
        });
    }

    const [slotsState, setSlotsState] = useState<Slot[]>(slots);

    function updateSlotsState(slot: Slot) {
        // update the state
        setSlotsState((prevState) => {
            // find the index of the slot
            const index = prevState.indexOf(slot);

            // get the data without the slot
            const excluded = prevState.filter((value) => value.id !== slot.id);

            return [
                ...excluded.slice(0, index), // elements before insertion index
                slot,
                ...excluded.slice(index), // elements after insertion index
            ];
        });
    }

    function updateSlot(e: { slot: Slot }) {
        const slot = slotsState.find((slot) => slot.id === e.slot.id);

        if (!slot) return;

        slot.suggestion = e.slot.suggestion;
        slot.mappool_suggestion_id = e.slot.mappool_suggestion_id;
        slot.freemod_disabled = e.slot.freemod_disabled;

        updateSlotsState(slot);
    }

    const { flash } = usePage().props;

    const suggestionPanel = (
        <>
            <Form
                action={addSuggestion(mappool)}
                resetOnSuccess
                transform={(data) => ({
                    ...data,
                    mods: data.mods.replace(/\s+/g, ''),
                })}
            >
                {({ errors, invalid, validate, processing }) => (
                    <>
                        <input
                            type="number"
                            name="beatmap_id"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Beatmap ID"
                            required
                            onBlur={() => validate('beatmap_id')}
                        />
                        {invalid('beatmap_id') && <p className="text-red-400">{errors.beatmap_id}</p>}
                        <input
                            type="text"
                            autoComplete="off"
                            name="mods"
                            className="block border-2 border-blue-400 p-2 focus:outline-0"
                            placeholder="Mods"
                            required
                            onBlur={() => validate('mods')}
                        />
                        {invalid('mods') && <p className="text-red-400">{errors.mods}</p>}
                        <button
                            type="submit"
                            className="block bg-green-300 p-2 hover:cursor-pointer hover:bg-green-400"
                            disabled={processing}
                        >
                            Submit
                        </button>
                    </>
                )}
            </Form>
            {flash.beatmap_not_found && <p className="text-red-500">{flash.beatmap_not_found}</p>}
        </>
    );

    return (
        <>
            <div className="grid place-items-center">{suggestionPanel}</div>
            <DragDropProvider>
                <div className="mx-8 my-4 flex gap-4">
                    <div className="max-w-1/2 overflow-auto">
                        <h1 className="text-center text-4xl font-bold">
                            {mappool.round} Suggestions &mdash; SR: {typeof mappool.star_rating === 'number' && mappool.star_rating.toFixed(2)} &#9733;
                        </h1>
                        <SuggestionTable
                            tags={tags}
                            suggestions={suggestionsState}
                        />
                    </div>
                    <div className="max-w-1/2 overflow-auto">
                        <h1 className="text-center text-4xl font-bold">Assembly Zone</h1>
                        <AssemblyTable
                            mappool={mappool}
                            slots={slotsState}
                        />
                    </div>
                </div>
            </DragDropProvider>
        </>
    );
}
