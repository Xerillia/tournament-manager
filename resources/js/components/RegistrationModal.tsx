import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Users, LogIn, X, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegistrationModal({ tournament, user, onClose }: any) {
    const [mode, setMode] = useState<'select' | 'solo' | 'team'>('select');
    const { data, setData, post, processing, errors } = useForm({
        type: 'solo',
        team_name: '',
        team_members: [] as number[],
        position: '',
    });

    const handleSoloSubmit = (e: any) => {
        e.preventDefault();
        post(`/tournaments/${tournament.id}/register/solo`, {
            onSuccess: () => onClose?.(),
        });
    };

    const handleTeamSubmit = (e: any) => {
        e.preventDefault();
        post(`/tournaments/${tournament.id}/register/team`, {
            onSuccess: () => onClose?.(),
        });
    };

    if (mode === 'select') {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md">
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Register for Tournament
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <button
                            onClick={() => setMode('solo')}
                            className="w-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 p-6 text-left hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Solo Player
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Register as individual player
                            </p>
                        </button>

                        <button
                            onClick={() => setMode('team')}
                            className="w-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 p-6 text-left hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-emerald-600 dark:text-emerald-400" />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Team Registration
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                Create or join a team (2-8 members)
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {mode === 'solo' ? 'Solo Registration' : 'Team Registration'}
                    </h2>
                    <button
                        onClick={() => setMode('select')}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={mode === 'solo' ? handleSoloSubmit : handleTeamSubmit}
                    className="p-6 space-y-4"
                >
                    {mode === 'solo' ? (
                        <>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                                    Player
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={user?.username || ''}
                                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                                />
                            </div>

                            {errors.type && (
                                <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                    {errors.type}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setMode('select')}
                                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    {processing ? 'Registering...' : 'Confirm Registration'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    value={data.team_name}
                                    onChange={(e) => setData('team_name', e.target.value)}
                                    placeholder="e.g., Dragon Slayers"
                                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                />
                                {errors.team_name && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                        {errors.team_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                                    Members (2-8)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Comma-separated user IDs"
                                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                />
                                {errors.team_members && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                        {errors.team_members}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setMode('select')}
                                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Creating...' : 'Create Team'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
