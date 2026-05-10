import { useState } from 'react';

interface SuggestionSearchbar {
    handleChange: (term: string) => void;
}

let timer: number;

export default function SuggestionSearchbar({ handleChange }: SuggestionSearchbar) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    function handle(term: string) {
        setSearchTerm(term);

        clearTimeout(timer);
        timer = setTimeout(() => {
            handleChange(term);
        }, 300);
    }
    return (
        <input
            name="searchbar"
            type="text"
            autoComplete="off"
            placeholder='Search and filter suggestions here! Comparator is possible: "AR=8 CS>=4 OD<9". Attributes: sr, bpm, combo, drain, cs, ar, od'
            className="mx-8 mt-6 w-6xl rounded-sm border border-black p-2 focus:outline-0"
            value={searchTerm}
            onChange={(e) => handle(e.target.value)}
        />
    );
}
