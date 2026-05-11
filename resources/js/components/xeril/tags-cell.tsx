import { addTagToSuggestion, removeTagFromSuggestion } from '@/routes/suggestions/tags';
import { BeatmapTag } from '@/types/beatmaptag';
import Fuse, { FuseResult } from 'fuse.js';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { PlusIcon, XIcon } from 'lucide-react';

interface TagsCellProps {
    originalTags: BeatmapTag[];
    suggestionId: number;
    tags?: BeatmapTag[];
    showButton?: boolean;
}

export default function TagsCell({ originalTags, suggestionId, tags, showButton = true }: TagsCellProps) {
    const [availableTags, setAvailableTags] = useState<BeatmapTag[]>(
        tags ? tags.filter((tag) => !originalTags.some((existingTag) => existingTag.id === tag.id)) : [],
    );

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [foundTags, setFoundTags] = useState<FuseResult<BeatmapTag>[]>([]);

    const fuse = new Fuse(availableTags, {
        keys: ['id', 'name'],
        threshold: 0.5,
    });

    useEffect(() => {
        setFoundTags(fuse.search(searchTerm));
    }, [searchTerm, availableTags]);

    useEffect(() => {
        setAvailableTags(tags ? tags.filter((tag) => !originalTags.some((existingTag) => existingTag.id === tag.id)) : []);
    }, [originalTags]);

    function addTag(tag: BeatmapTag) {
        router.post(addTagToSuggestion([suggestionId, tag]));
    }

    function removeTag(tag: BeatmapTag) {
        router.delete(removeTagFromSuggestion([suggestionId, tag]));
    }
    return (
        <div className="relative align-middle">
            <div className="flex w-32 flex-wrap gap-1 px-2 py-1">
                {originalTags.map((tag) => (
                    <span
                        key={tag.id}
                        className="flex rounded-full bg-blue-200 px-1 text-xs"
                    >
                        <p>{tag.name}</p>
                        {showButton && (
                            <button
                                className="group ml-0.5 hover:cursor-pointer"
                                onClick={() => removeTag(tag)}
                            >
                                <XIcon
                                    className="size-2.5 rounded-full bg-black group-hover:bg-gray-500"
                                    color="#fff"
                                />
                            </button>
                        )}
                    </span>
                ))}
            </div>
            {showButton && (
                <button
                    type="button"
                    className="group p-2 hover:cursor-pointer"
                    onClick={() => setShowPopup(true)}
                >
                    <PlusIcon
                        className="size-5 w-20 rounded-sm bg-green-400 p-0.5 group-hover:bg-green-500"
                        color="#000"
                    />
                </button>
            )}
            {showPopup && (
                <>
                    <div
                        className="fixed top-0 left-0 z-1 h-full w-full"
                        onClick={() => setShowPopup(false)}
                    />
                    <div className="absolute top-0 left-full z-2 rounded-sm border border-black bg-white">
                        <input
                            type="text"
                            name="tag"
                            autoComplete="off"
                            className="w-full border-b p-2 focus:outline-0"
                            placeholder="Search a tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="max-h-80 min-h-40 w-80 flex-col overflow-y-auto">
                            {!searchTerm &&
                                availableTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        className="w-full border px-2 py-1 hover:cursor-pointer hover:bg-black/10"
                                        onClick={() => addTag(tag)}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            {searchTerm &&
                                foundTags.map((tag) => (
                                    <button
                                        key={tag.item.id}
                                        className="w-full border px-2 py-1 hover:cursor-pointer hover:bg-black/10"
                                        onClick={() => addTag(tag.item)}
                                    >
                                        <p>{tag.item.name}</p>
                                    </button>
                                ))}
                            {searchTerm && foundTags.length === 0 && <p className="leading-40">No tags matched!</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
