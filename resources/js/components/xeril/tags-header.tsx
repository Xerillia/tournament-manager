import { BeatmapTag } from '@/types/beatmaptag';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

interface TagsHeaderProps {
    tags: BeatmapTag[];
    handleTagFilters: (tagFilters: TagFilter[]) => void;
}

export type TagFilter = {
    id: number;
    name: string;
    filter: Filter;
};

type Filter = 'include' | 'exclude' | null;

export default function TagsHeader({ tags, handleTagFilters }: TagsHeaderProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [tagsFilter, setTagsFilter] = useState<TagFilter[]>([]);

    function filter(tag: BeatmapTag) {
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

        const filter = tagsFilter.find((filter) => filter.id === tag.id);
        if (!filter) return setTagsFilter((prevState) => [...prevState, { id: tag.id, name: tag.name, filter: 'include' }]);

        filter.filter = cycle(filter.filter);
        setTagsFilter((prevState) => {
            const index = prevState.indexOf(filter);
            const filtered = prevState.filter((filter) => filter.id !== tag.id);
            return [...filtered.slice(0, index), filter, ...filtered.slice(index)];
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
                onClick={() => setShowModal(true)}
            >
                Tags
                <div className="flex gap-1 px-2 text-xs font-normal">
                    {tagsFilter.map((filter) => {
                        switch (filter.filter) {
                            case 'include':
                                return (
                                    <p
                                        key={filter.id}
                                        className="rounded-full bg-green-200 px-1"
                                    >{`+${filter.name}`}</p>
                                );
                            case 'exclude':
                                return (
                                    <p
                                        key={filter.id}
                                        className="rounded-full bg-red-200 px-1"
                                    >{`-${filter.name}`}</p>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </button>
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 z-4 h-screen w-screen"
                        onClick={() => setShowModal(false)}
                    />
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
                                            onClick={() => filter(tag)}
                                        >
                                            {tag.name}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
