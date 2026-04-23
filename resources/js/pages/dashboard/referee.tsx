import { Head } from '@inertiajs/react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { Button } from '@/components/ui/button';

export default function RefereeDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-900">
            <Head title="Referee Hub - FISH" />

            <Navbar />

            {/* HERO SECTION */}
            <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase shadow-sm">
                            <div className="size-2 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                            IRC Connected
                        </div>
                    </div>

                    <h1 className="text-5xl leading-tight font-bold text-slate-900 dark:text-white md:text-6xl">
                        Referee{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Hub
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-400">
                        Manage multiplayer lobbies, track team scores, handle IRC commands, and control match progression in real-time.
                    </p>

                    {/* CENTERED STAGE SELECTOR */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {[
                            'Qualifiers',
                            'RO16',
                            'Quarter Finals',
                            'Semi Finals',
                            'Grand Finals',
                        ].map((s) => (
                            <button
                                key={s}
                                className={`rounded-full px-8 py-3 text-sm font-semibold transition-all ${
                                    s === 'RO16' // Contoh active stage
                                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700'
                                        : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT SIDE: MATCH & BRACKET (8 COLUMNS) */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* LIVE MATCH CONTROL BOX */}
                        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm md:p-12">
                            <div className="mb-10 flex flex-col items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-8 md:flex-row md:text-left">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        Match Control
                                    </h2>
                                    <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400 uppercase">
                                        Lobby: #MP102931
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-lg border-slate-300 dark:border-slate-600 px-6 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >
                                        Invite All
                                    </Button>
                                    <Button className="rounded-lg bg-indigo-600 dark:bg-indigo-500 px-8 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                        Finish Match
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                                <TeamScoreCard
                                    team="Team Red"
                                    score={3}
                                    color="bg-red-500"
                                />
                                <TeamScoreCard
                                    team="Team Blue"
                                    score={1}
                                    color="bg-blue-500"
                                />
                            </div>

                            {/* CONTROL ACTIONS */}
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <RefActionButton
                                    label="Start"
                                    icon="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                                />
                                <RefActionButton
                                    label="Abort"
                                    icon="M6 18L18 6M6 6l12 12"
                                />
                                <RefActionButton
                                    label="Lock"
                                    icon="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.063A6.981 6.981 0 0112 20.25a6.981 6.981 0 018.25-6.687"
                                />
                                <RefActionButton
                                    label="Next Map"
                                    icon="M11.25 4.5l7.5 7.5-7.5 7.5M4.5 4.5l7.5 7.5-7.5 7.5"
                                />
                            </div>
                        </section>

                        {/* MATCH PHASES */}
                        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
                            <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Match Phases</h3>
                            <div className="space-y-3">
                                <MatchPhase phase="Warmup" status="completed" />
                                <MatchPhase phase="Bans" status="completed" />
                                <MatchPhase phase="Pick & Play" status="active" mapCount="3/7" />
                                <MatchPhase phase="Completed" status="pending" />
                            </div>
                        </section>

                        {/* BRACKET PROGRESSION */}
                        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm">
                            <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                IRC Commands Reference
                            </h2>
                            <div className="space-y-4">
                                <IRCCommand cmd="!mp make" desc="Create new multiplayer lobby" />
                                <IRCCommand cmd="!mp invite" desc="Invite players to lobby" />
                                <IRCCommand cmd="!mp team" desc="Assign player to team (blue/red)" />
                                <IRCCommand cmd="!mp start" desc="Start match with countdown" />
                                <IRCCommand cmd="!mp abort" desc="Abort current match" />
                                <IRCCommand cmd="!mp map" desc="Select specific beatmap for match" />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDE: SCHEDULE & IRC (4 COLUMNS) */}
                    <aside className="space-y-8 lg:col-span-4">
                        {/* AI SCHEDULE SUGGESTION */}
                        <section className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 p-8 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-indigo-600 dark:bg-indigo-500 p-2 text-white shadow-lg shadow-indigo-500/20">
                                    <svg
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold tracking-tight text-indigo-900 dark:text-indigo-100">
                                    AI Scheduling
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <AIScheduleItem
                                    time="14:00 UTC"
                                    match="Xeril vs Alerr"
                                    confidence="98%"
                                />
                                <AIScheduleItem
                                    time="15:30 UTC"
                                    match="Team A vs Team B"
                                    confidence="85%"
                                />
                            </div>

                            <Button className="mt-6 w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 py-6 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                Apply Auto-Schedule
                            </Button>
                        </section>

                        {/* IRC LOGS PREVIEW */}
                        <section className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 p-8 shadow-lg">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                                Live IRC Logs
                            </h3>
                            <div className="scrollbar-hide h-48 space-y-1 overflow-y-auto font-mono text-[11px] leading-relaxed text-stone-400">
                                <p className="text-emerald-400">
                                    [13:00] !mp make Strategy Cup: RO16
                                </p>
                                <p className="text-stone-500">
                                    [13:01] BanchoBot: Room link:
                                    osu.ppy.sh/mp/12345
                                </p>
                                <p className="text-white">
                                    <span className="text-blue-400">
                                        Referee:
                                    </span>{' '}
                                    !mp start 10
                                </p>
                                <p className="text-stone-500">
                                    [13:01] BanchoBot: Match starting in 10s.
                                </p>
                                <div className="mt-4 animate-pulse text-orange-500">
                                    _
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </main>

            <Footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" />
        </div>
    );
}

// --- SUB-COMPONENTS ---

function TeamScoreCard({ team, score, color }: any) {
    return (
        <div className="flex flex-col items-center rounded-[32px] border border-stone-100 bg-stone-50/50 p-8 transition-all hover:bg-white hover:shadow-xl">
            <span className="mb-3 text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
                {team}
            </span>
            <span
                className={`text-7xl font-black tracking-tighter ${score > 0 ? 'text-stone-900' : 'text-stone-300'}`}
            >
                {score}
            </span>
            <div
                className={`mt-6 h-2 w-16 rounded-full ${color} shadow-lg`}
            ></div>
        </div>
    );
}

function RefActionButton({ label, icon, color = '' }: any) {
    return (
        <button
            className={`group flex flex-col items-center justify-center gap-3 rounded-lg p-6 transition-all hover:-translate-y-1 ${
                color && color.includes('bg-stone') ? 
                'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 dark:hover:bg-indigo-600' :
                color && color.includes('bg-red') ?
                'bg-red-600 dark:bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-700 dark:hover:bg-red-600' :
                'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 dark:hover:bg-indigo-600'
            }`}
        >
            <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
            <span className="text-xs font-semibold tracking-wider uppercase">
                {label}
            </span>
        </button>
    );
}

function BracketRound({ title, matches, active = false }: any) {
    return (
        <div
            className={`w-56 shrink-0 rounded-lg border p-6 transition-all ${
                active
                    ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
        >
            <h4
                className={`mb-5 text-xs font-semibold tracking-wider uppercase ${
                    active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                }`}
            >
                {title}
            </h4>
            <div className="space-y-3">
                {matches.map((m: any) => (
                    <div
                        key={m}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-4 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                    >
                        {m}
                    </div>
                ))}
            </div>
        </div>
    );
}

function AIScheduleItem({ time, match, confidence }: any) {
    return (
        <div className="group rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 p-5 transition-all hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {time}
                </span>
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {confidence}
                </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                {match}
            </p>
        </div>
    );
}

function MatchPhase({ phase, status, mapCount }: any) {
    const statusColors = {
        completed: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        active: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
        pending: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    };
    
    return (
        <div className={`rounded-lg border-2 p-4 ${statusColors[status as keyof typeof statusColors]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">{phase}</h4>
                    {mapCount && <p className="text-xs opacity-75">Maps: {mapCount}</p>}
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    status === 'completed' ? 'bg-emerald-500' :
                    status === 'active' ? 'bg-indigo-600 text-white' :
                    'bg-slate-400'
                }`}>
                    {status}
                </div>
            </div>
        </div>
    );
}

function IRCCommand({ cmd, desc }: any) {
    return (
        <div className="flex items-start gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="flex-shrink-0">
                <code className="rounded bg-slate-900 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs font-bold text-indigo-400">
                    {cmd}
                </code>
            </div>
            <div className="flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{desc}</p>
            </div>
        </div>
    );
}
