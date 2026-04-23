import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PlayersSearchFilter({ players, teams, onFilter }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterFreeAgent, setFilterFreeAgent] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const uniqueCountries = useMemo(() => {
        return [...new Set(players.map((p: any) => p.country))].filter(Boolean);
    }, [players]);

    const filtered = useMemo(() => {
        return players.filter((p: any) => {
            const matchesSearch =
                p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.discord?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCountry = !filterCountry || p.country === filterCountry;

            const isFreeAgent = !teams.some((t: any) =>
                t.members.some((m: any) => m.id === p.id)
            );
            const matchesFreeAgent = !filterFreeAgent || isFreeAgent;

            return matchesSearch && matchesCountry && matchesFreeAgent;
        });
    }, [searchQuery, filterCountry, filterFreeAgent, players, teams]);

    return (
        <div className="space-y-4 mb-6">
            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />
                    <input
                        type="text"
                        placeholder="Search username or discord..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                        'px-4 py-2 border text-xs font-semibold transition-colors flex items-center gap-2',
                        showFilters
                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500 text-white'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                    )}
                >
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* Filter Dropdown */}
            {showFilters && (
                <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 space-y-3">
                    {/* Country Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                            Country
                        </label>
                        <select
                            value={filterCountry}
                            onChange={(e) => setFilterCountry(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                        >
                            <option value="">All Countries</option>
                            {uniqueCountries.map((country: any) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Free Agent Filter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filterFreeAgent}
                            onChange={(e) => setFilterFreeAgent(e.target.checked)}
                            className="w-4 h-4 border border-slate-200 dark:border-slate-700"
                        />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                            Free Agents Only
                        </span>
                    </label>

                    {/* Results Info */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                        Found: <span className="font-bold">{filtered.length}</span> player(s)
                    </p>
                </div>
            )}
        </div>
    );
}
