import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Users,
    Zap,
    BarChart3,
    Plus,
    X,
    AlertCircle,
    Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StaffActionsWidget({ tournament, user }: any) {
    const [activePanel, setActivePanel] = useState<
        'add-player' | 'roll' | 'score' | null
    >(null);
    const [rollResult, setRollResult] = useState<number | null>(null);

    // Add Player Form
    const addPlayerForm = useForm({
        username: '',
        role: 'player',
    });

    // Score Update Form
    const scoreForm = useForm({
        team_a_score: 0,
        team_b_score: 0,
        match_id: '',
    });

    const handleAddPlayer = (e: any) => {
        e.preventDefault();
        addPlayerForm.post(`/tournaments/${tournament.id}/staff/add-player`, {
            onSuccess: () => {
                addPlayerForm.reset();
                setActivePanel(null);
            },
        });
    };

    const handleRoll = () => {
        const result = Math.floor(Math.random() * 100) + 1;
        setRollResult(result);
    };

    const handleScoreUpdate = (e: any) => {
        e.preventDefault();
        scoreForm.post(`/tournaments/${tournament.id}/staff/update-score`, {
            onSuccess: () => {
                scoreForm.reset();
                setActivePanel(null);
            },
        });
    };

    // Check if user is staff
    const isStaff = user?.role === 'admin' || user?.role === 'referee' || user?.role === 'host';

    if (!isStaff) return null;

    return (
        <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 h-fit sticky top-20">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase">
                Staff Actions
            </h3>

            <div className="space-y-2">
                {/* Add Player Button */}
                <button
                    onClick={() =>
                        setActivePanel(
                            activePanel === 'add-player' ? null : 'add-player'
                        )
                    }
                    className={cn(
                        'w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold border transition-colors',
                        activePanel === 'add-player'
                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500 text-white'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                    )}
                >
                    <Plus size={16} />
                    Add Player
                </button>

                {/* Roll Button */}
                <button
                    onClick={() =>
                        setActivePanel(activePanel === 'roll' ? null : 'roll')
                    }
                    className={cn(
                        'w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold border transition-colors',
                        activePanel === 'roll'
                            ? 'border-amber-600 dark:border-amber-500 bg-amber-600 dark:bg-amber-500 text-white'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-300 dark:hover:border-amber-700'
                    )}
                >
                    <Zap size={16} />
                    Roll Numbers
                </button>

                {/* Score Update Button */}
                <button
                    onClick={() =>
                        setActivePanel(activePanel === 'score' ? null : 'score')
                    }
                    className={cn(
                        'w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold border transition-colors',
                        activePanel === 'score'
                            ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-600 dark:bg-emerald-500 text-white'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-300 dark:hover:border-emerald-700'
                    )}
                >
                    <BarChart3 size={16} />
                    Update Score
                </button>
            </div>

            {/* Panel Content */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                {/* Add Player Panel */}
                {activePanel === 'add-player' && (
                    <form onSubmit={handleAddPlayer} className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                                Username
                            </label>
                            <input
                                type="text"
                                value={addPlayerForm.data.username}
                                onChange={(e) =>
                                    addPlayerForm.setData(
                                        'username',
                                        e.target.value
                                    )
                                }
                                placeholder="Player name"
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                                Role
                            </label>
                            <select
                                value={addPlayerForm.data.role}
                                onChange={(e) =>
                                    addPlayerForm.setData('role', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                            >
                                <option value="player">Player</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        {addPlayerForm.errors.username && (
                            <div className="flex gap-2 p-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                                <AlertCircle size={14} className="flex-shrink-0" />
                                {addPlayerForm.errors.username}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={addPlayerForm.processing}
                            className="w-full px-3 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                        >
                            {addPlayerForm.processing ? 'Adding...' : 'Add'}
                        </button>
                    </form>
                )}

                {/* Roll Panel */}
                {activePanel === 'roll' && (
                    <div className="space-y-3">
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            Click to roll a random number (1-100)
                        </p>

                        {rollResult !== null && (
                            <div className="border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 p-4 text-center">
                                <p className="text-xs text-amber-700 dark:text-amber-300 uppercase font-semibold mb-2">
                                    Result
                                </p>
                                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                    {rollResult}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleRoll}
                            className="w-full px-4 py-2 bg-amber-600 dark:bg-amber-500 text-white text-xs font-semibold hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
                        >
                            🎲 Roll
                        </button>
                    </div>
                )}

                {/* Score Update Panel */}
                {activePanel === 'score' && (
                    <form onSubmit={handleScoreUpdate} className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                                Team A Score
                            </label>
                            <input
                                type="number"
                                value={scoreForm.data.team_a_score}
                                onChange={(e) =>
                                    scoreForm.setData(
                                        'team_a_score',
                                        parseInt(e.target.value)
                                    )
                                }
                                min={0}
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                                Team B Score
                            </label>
                            <input
                                type="number"
                                value={scoreForm.data.team_b_score}
                                onChange={(e) =>
                                    scoreForm.setData(
                                        'team_b_score',
                                        parseInt(e.target.value)
                                    )
                                }
                                min={0}
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={scoreForm.processing}
                            className="w-full px-3 py-2 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                        >
                            {scoreForm.processing ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                )}
            </div>
        </aside>
    );
}
