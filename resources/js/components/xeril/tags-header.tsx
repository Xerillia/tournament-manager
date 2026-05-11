import { BeatmapTag } from '@/types/beatmaptag';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

interface TagsHeaderProps {
    tags: BeatmapTag[];
    handleTagFilters: (tagFilters: TagFilter[]) => void;
}

export type TagFilter = {
    id: number;
    filter: Filter;
};

type Filter = 'include' | 'exclude' | null;

export default function TagsHeader({ tags, handleTagFilters }: TagsHeaderProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [tagsFilter, setTagsFilter] = useState<TagFilter[]>([]);

    function filter(id: number) {
        function cycle(filter: Filter) {
            switch (filter) {
                case 'include':
                    return 'exclude';
                case 'exclude':
                    return null;
                default:
                    return 'include';
            }
        }

        const tag = tagsFilter.find((tag) => tag.id === id);
        if (!tag) return setTagsFilter((prevState) => [...prevState, { id: id, filter: 'include' }]);

        tag.filter = cycle(tag.filter);
        setTagsFilter((prevState) => {
            const index = prevState.indexOf(tag);
            const filtered = prevState.filter((tag) => tag.id !== id);
            return [...filtered.slice(0, index), tag, ...filtered.slice(index)];
        });
    }

    useEffect(() => handleTagFilters(tagsFilter), [tagsFilter]);

    const fuse = new Fuse(tags, {
        keys: ['name'],
        threshold: 0.4,
    });

    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <div className="relative -mx-2 -my-5 h-16 w-32">
            <button
                type="button"
                className="h-full w-full cursor-pointer hover:bg-black/10"
                onClick={() => setShowModal(!showModal)}
            >
                Tags
            </button>
            {showModal && (
                <div className="absolute z-5 rounded-sm border border-black bg-white">
                    <h1 className="border-b px-4 pt-4 pb-2 text-2xl">Include / Exclude Tags</h1>
                    <div className="flex gap-1.5 border-b px-6 py-2">
                        <span className="h-6 w-6 bg-green-300" /> Included
                        <span className="ml-2 h-6 w-6 bg-red-300" /> Excluded
                        <span className="ml-2 h-6 w-6 border" /> None
                    </div>
                    <input
                        type="text"
                        autoComplete="off"
                        className="w-full p-2 text-center font-normal focus:outline-0"
                        placeholder="Search a tag..."
                        autoFocus={true}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid max-h-100 grid-cols-1 overflow-y-auto select-none">
                        {fuse
                            .search(searchTerm)
                            .map((result) => result.item)
                            .map((tag) => {
                                const tagFilter = tagsFilter.find((filter) => filter.id === tag.id);
                                let color = ' ';
                                switch (tagFilter?.filter) {
                                    case 'include':
                                        color = 'bg-green-300 ';
                                        break;
                                    case 'exclude':
                                        color = 'bg-red-300 ';
                                        break;
                                }
                                return (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        className={color + 'cursor-pointer border-y py-1.5 font-normal'}
                                        onClick={() => filter(tag.id)}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}
