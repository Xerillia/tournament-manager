import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Tournament } from '@/types/tournament';
import { Lobby, LobbyStage } from '@/types/lobby';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { cn } from '@/lib/utils';
import {
    ExternalLink,
    Mic,
    MonitorPlay,
    ShieldCheck,
    Trophy,
} from 'lucide-react';

// --- DUMMY DATA DENGAN STATUS & SCORE ---
const DUMMY_LOBBIES: any[] = [
    {
        id: 1,
        name: 'Lobby A1',
        stage: 'qualifiers',
        status: 'finished',
        scheduled_at: '2026-05-10T10:00:00Z',
        referees: [{ id: 1, name: 'Rudy' }],
        streamer: 'Bang Alex',
        caster: 'Pak Pulung',
        mp_link: '#',
        score: { blue: 2, red: 1 },
        match_rounds: [
            {
                team_one: { name: 'Indo Pride' },
                team_two: { name: 'Sentinels' },
            },
        ],
    },
    {
        id: 2,
        name: 'Lobby A2',
        stage: 'qualifiers',
        status: 'finished',
        scheduled_at: '2026-05-10T11:00:00Z',
        referees: [{ id: 2, name: 'Siska' }],
        streamer: 'Windah B.',
        caster: 'KB',
        mp_link: '#',
        score: { blue: 0, red: 2 },
        match_rounds: [
            { team_one: { name: 'Paper Rex' }, team_two: { name: 'Zeta Div' } },
        ],
    },
    {
        id: 3,
        name: 'Lobby A3',
        stage: 'qualifiers',
        status: 'live',
        scheduled_at: '2026-05-10T13:00:00Z',
        referees: [{ id: 1, name: 'Rudy' }],
        streamer: 'MiawAug',
        caster: 'Ko Lius',
        mp_link: '#',
        score: { blue: 1, red: 1 },
        match_rounds: [
            { team_one: { name: 'Team Secret' }, team_two: { name: 'Talon' } },
        ],
    },
    {
        id: 4,
        name: 'Lobby B1',
        stage: 'qualifiers',
        status: 'upcoming',
        scheduled_at: '2026-05-11T10:00:00Z',
        referees: [{ id: 3, name: 'Budi' }],
        streamer: 'R7 Team',
        caster: 'Butsss',
        mp_link: '#',
        score: null,
        match_rounds: [
            { team_one: { name: 'Fnatic' }, team_two: { name: 'LOUD' } },
        ],
    },
    // ... (Data lainnya mengikuti pola status upcoming/finished)
    {
        id: 14,
        name: 'Final',
        stage: 'finals',
        status: 'upcoming',
        scheduled_at: '2026-05-16T20:00:00Z',
        referees: [{ id: 4, name: 'Alex' }],
        streamer: 'FISH TV',
        caster: 'Legend Duo',
        mp_link: '#',
        score: null,
        match_rounds: [
            { team_one: { name: 'TBD' }, team_two: { name: 'TBD' } },
        ],
    },
];

export default function Schedule({
    tournament,
    lobbies = DUMMY_LOBBIES,
    stages = [
        'qualifiers',
        'round-of-16',
        'quarterfinals',
        'semifinals',
        'finals',
    ],
}: ScheduleProps) {
    const [selectedStage, setSelectedStage] = useState<LobbyStage | null>(null);

    const stageLabels: Record<string, string> = {
        qualifiers: 'Qualifiers',
        'round-of-16': 'Round of 16',
        quarterfinals: 'Quarter Finals',
        semifinals: 'Semi Finals',
        finals: 'Finals',
    };

    const filteredLobbies = lobbies.filter((lobby) =>
        selectedStage ? lobby.stage === selectedStage : true,
    );

    const displayedGroupedLobbies = filteredLobbies.reduce(
        (acc, lobby) => {
            if (!lobby.scheduled_at) return acc;
            const dateKey = new Date(lobby.scheduled_at).toLocaleDateString(
                'id-ID',
                {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                },
            );
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(lobby);
            return acc;
        },
        {} as Record<string, any[]>,
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
            <Head title="Jadwal & Skor - FISH" />
            <Navbar />

            <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                        Match{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Results
                        </span>
                    </h1>

                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedStage(null)}
                            className={cn(
                                'rounded-lg px-5 py-2 text-xs font-semibold uppercase transition-all',
                                selectedStage === null
                                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                    : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700',
                            )}
                        >
                            All
                        </button>
                        {stages.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSelectedStage(s)}
                                className={cn(
                                    'rounded-lg px-5 py-2 text-xs font-semibold uppercase transition-all',
                                    selectedStage === s
                                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                        : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700',
                                )}
                            >
                                {stageLabels[s] || s}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-16">
                <div className="space-y-16">
                    {Object.entries(displayedGroupedLobbies).map(
                        ([date, lobbies]) => (
                            <section key={date}>
                                <div className="mb-8 flex items-center gap-6">
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                                        {date}
                                    </h2>
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {lobbies.map((lobby) => (
                                        <ScheduleLobbyCard
                                            key={lobby.id}
                                            lobby={lobby}
                                        />
                                    ))}
                                </div>
                            </section>
                        ),
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function ScheduleLobbyCard({ lobby }: { lobby: any }) {
    const timeStr = new Date(lobby.scheduled_at).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const blueTeam = lobby.match_rounds?.[0]?.team_one?.name || 'TBD';
    const redTeam = lobby.match_rounds?.[0]?.team_two?.name || 'TBD';

    // Logika penentuan pemenang untuk styling
    const blueWin = lobby.score && lobby.score.blue > lobby.score.red;
    const redWin = lobby.score && lobby.score.red > lobby.score.blue;

    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* STATUS BADGE */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                        {timeStr}
                    </span>
                    {lobby.status === 'live' && (
                        <span className="flex animate-pulse items-center gap-1.5 rounded-md bg-red-500 px-2.5 py-1 text-xs font-semibold text-white uppercase">
                            <div className="size-1.5 rounded-full bg-white" />{' '}
                            LIVE
                        </span>
                    )}
                    {lobby.status === 'finished' && (
                        <span className="rounded-md bg-slate-200 dark:bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase">
                            Finished
                        </span>
                    )}
                </div>
                <a
                    href={lobby.mp_link}
                    target="_blank"
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                    MP Link <ExternalLink size={14} />
                </a>
            </div>

            {/* SCOREBOARD SECTION */}
            <div className="flex items-center justify-between p-6">
                {/* BLUE TEAM */}
                <div className="flex flex-1 flex-col items-center gap-2">
                    <div
                        className={cn(
                            'w-full rounded-lg border p-3 text-center transition-all',
                            blueWin
                                ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800',
                        )}
                    >
                        <span
                            className={cn(
                                'text-sm font-bold',
                                blueWin 
                                    ? 'text-blue-700 dark:text-blue-300' 
                                    : 'text-slate-700 dark:text-slate-300',
                            )}
                        >
                            {blueTeam}
                        </span>
                    </div>
                    {blueWin && (
                        <Trophy size={16} className="text-amber-500" />
                    )}
                </div>

                {/* SCORE CENTER */}
                <div className="flex flex-col items-center px-4">
                    {lobby.score ? (
                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    'text-3xl font-bold',
                                    blueWin
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-slate-400 dark:text-slate-500',
                                )}
                            >
                                {lobby.score.blue}
                            </span>
                            <span className="text-lg font-bold text-slate-400 dark:text-slate-600">
                                :
                            </span>
                            <span
                                className={cn(
                                    'text-3xl font-bold',
                                    redWin 
                                        ? 'text-red-600 dark:text-red-400' 
                                        : 'text-slate-400 dark:text-slate-500',
                                )}
                            >
                                {lobby.score.red}
                            </span>
                        </div>
                    ) : (
                        <span className="text-lg font-bold text-slate-400 dark:text-slate-600">
                            VS
                        </span>
                    )}
                    <span className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        {lobby.name}
                    </span>
                </div>

                {/* RED TEAM */}
                <div className="flex flex-1 flex-col items-center gap-2">
                    <div
                        className={cn(
                            'w-full rounded-lg border p-3 text-center transition-all',
                            redWin
                                ? 'border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800',
                        )}
                    >
                        <span
                            className={cn(
                                'text-sm font-bold',
                                redWin 
                                    ? 'text-red-700 dark:text-red-300' 
                                    : 'text-slate-700 dark:text-slate-300',
                            )}
                        >
                            {redTeam}
                        </span>
                    </div>
                    {redWin && <Trophy size={16} className="text-amber-500" />}
                </div>
            </div>

            {/* STAFF INFO */}
            <div className="mt-auto grid grid-cols-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-3">
                <div className="flex flex-col items-center gap-1">
                    <MonitorPlay size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        {lobby.streamer || '-'}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-r border-slate-200 dark:border-slate-700">
                    <Mic size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        {lobby.caster || '-'}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={14} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                        {lobby.referees?.[0]?.name || '-'}
                    </span>
                </div>
            </div>
        </div>
    );
}
