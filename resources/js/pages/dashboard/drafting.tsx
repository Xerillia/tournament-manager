import { Head } from '@inertiajs/react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { Button } from '@/components/ui/button';

interface PoolCategoryProps {
    name: string;
    label: string;
    description: string;
    count: number;
}

const PoolCategory = ({ name, label, description, count }: PoolCategoryProps) => (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        {name}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{label}</h3>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{count}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">maps</div>
            </div>
        </div>
    </div>
);

export default function PoolingManagement() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-900">
            <Head title="Pool Drafting - FISH" />

            <Navbar />

            {/* HEADER SECTION - IDENTIK DENGAN REFEREE HUB */}
            <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase shadow-sm">
                            <div className="size-2 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                            Drafting Mode Active
                        </div>
                    </div>

                    <h1 className="text-5xl leading-tight font-bold text-slate-900 dark:text-white md:text-6xl">
                        Mappool{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Management
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-400">
                        Create, organize, and manage beatmap pools with difficulty categories, difficulty balancing, and team picks strategy.
                    </p>

                    {/* CENTERED STAGE SELECTOR - SAMA DENGAN REFEREE */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {['NM', 'HD', 'HR', 'DT', 'FM', 'TB'].map((cat) => (
                            <button
                                key={cat}
                                className={`rounded-full px-8 py-3 text-sm font-semibold transition-all ${
                                    cat === 'NM'
                                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700'
                                        : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT SIDE: ASSEMBLY & PREVIEW (8 COLUMNS) */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* ACTIVE PREVIEW (Gaya Referee Hub Match Control) */}
                        <section className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 p-10 text-white shadow-lg transition-all hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/20">
                            <div className="absolute top-0 right-0 h-full w-full opacity-30 grayscale transition-all duration-1000 group-hover:grayscale-0 md:w-2/3">
                                <img
                                    src="https://assets.ppy.sh/beatmaps/1011055/covers/cover.jpg"
                                    className="h-full w-full object-cover"
                                    alt="bg"
                                />
                            </div>
                            <div className="relative z-10">
                                <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:text-left">
                                    <div>
                                        <span className="mb-2 inline-block rounded-lg bg-indigo-600 px-4 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                                            NM - No Mod
                                        </span>
                                        <h3 className="text-4xl font-bold tracking-tight">
                                            Beyond The Horizon
                                        </h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="rounded-lg border-white/20 bg-white/10 px-6 text-xs font-semibold text-white hover:bg-white/20"
                                        >
                                            Replace Map
                                        </Button>
                                    </div>
                                </div>

                                <p className="mt-3 text-lg font-semibold text-white/80 italic">
                                    Yooh - Beyond The Horizon [Insane]
                                </p>

                                <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                                    <PreviewStat
                                        label="Star Rating"
                                        value="5.62*"
                                    />
                                    <PreviewStat label="BPM" value="190" />
                                    <PreviewStat label="AR" value="9.4" />
                                    <PreviewStat label="Length" value="03:46" />
                                </div>
                            </div>
                        </section>

                        {/* ASSEMBLY AREA */}
                        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 shadow-sm">
                            <h2 className="mb-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Mappool Categories
                            </h2>
                            <div className="space-y-4">
                                <PoolCategory name="NM" label="No Mod" description="Standard difficulty maps" count={3} />
                                <PoolCategory name="HD" label="Hidden" description="Approach circles hidden" count={3} />
                                <PoolCategory name="HR" label="Hard Rock" description="Higher AR and difficulty" count={3} />
                                <PoolCategory name="DT" label="Double Time" description="1.5x speed (hardest)" count={3} />
                                <PoolCategory name="FM" label="Freemod" description="Any mods allowed" count={2} />
                                <PoolCategory name="TB" label="Tiebreaker" description="Played only if tied" count={1} />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDE: AI & DRAFTS (4 COLUMNS) */}
                    <aside className="space-y-8 lg:col-span-4">
                        {/* AI SUGGESTIONS PANEL */}
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
                                    AI Candidates
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <AISuggestionCard
                                    title="Cycle Hit"
                                    artist="KASAI HARDCORES"
                                    sr="6.1*"
                                    reason="Pace Match"
                                />
                                <AISuggestionCard
                                    title="Galaxy Collapse"
                                    artist="Kurokotei"
                                    sr="7.5*"
                                    reason="High Tech"
                                />
                            </div>

                            <Button className="mt-6 w-full rounded-lg bg-indigo-600 dark:bg-indigo-500 py-6 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                Refresh Candidates
                            </Button>
                        </section>

                        {/* RECENT DRAFTS (Gaya IRC Logs di Referee) */}
                        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
                            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                                Recent Drafts
                            </h3>
                            <div className="space-y-2">
                                <DraftItem
                                    label="RO16_Draft_v2.pool"
                                    date="2h ago"
                                />
                                <DraftItem
                                    label="Quals_Backup.pool"
                                    date="5h ago"
                                />
                                <DraftItem
                                    label="SemiFinal_Draf.pool"
                                    date="1d ago"
                                />
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

function AssemblySlot({
    slotId,
    mapTitle,
    artist,
    sr,
    filled = false,
    empty = false,
    active = false,
}: any) {
    return (
        <div
            className={`group flex cursor-pointer items-center justify-between rounded-[28px] border-2 p-6 transition-all duration-300 ${
                active
                    ? 'border-orange-400 bg-orange-50/50 shadow-md'
                    : filled
                      ? 'border-stone-50 bg-white hover:border-stone-200'
                      : 'border-dashed border-stone-200 bg-stone-50/50'
            }`}
        >
            <div className="flex items-center gap-6">
                <span
                    className={`text-sm font-black tracking-widest ${active ? 'text-orange-500' : 'text-stone-300'}`}
                >
                    {slotId}
                </span>
                {empty ? (
                    <span className="text-sm font-bold text-stone-400 italic">
                        To be assigned...
                    </span>
                ) : (
                    <div>
                        <h4 className="flex items-center gap-2 text-base font-black tracking-tight text-stone-900">
                            {mapTitle}
                            <span className="rounded-md bg-orange-100/50 px-1.5 py-0.5 text-[10px] font-black text-orange-500">
                                {sr}
                            </span>
                        </h4>
                        <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                            {artist}
                        </p>
                    </div>
                )}
            </div>
            <button className="text-stone-300 transition-colors hover:text-orange-500">
                <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path
                        d={
                            empty
                                ? 'M12 4.5v15m7.5-7.5h-15'
                                : 'M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                        }
                    />
                </svg>
            </button>
        </div>
    );
}

function AISuggestionCard({ title, artist, sr, reason }: any) {
    return (
        <div className="group rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 p-5 transition-all hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {title}
                </span>
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {sr}
                </span>
            </div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                {artist}
            </p>
            <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 px-3 py-1 text-xs font-semibold tracking-tight text-slate-600 dark:text-slate-400 uppercase">
                {reason}
            </span>
        </div>
    );
}

function PreviewStat({ label, value }: any) {
    return (
        <div className="flex flex-col border-l border-white/30 pl-6">
            <span className="mb-2 text-xs font-semibold tracking-wider text-white/70 uppercase">
                {label}
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
                {value}
            </span>
        </div>
    );
}

function DraftItem({ label, date }: any) {
    return (
        <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-2 transition-all hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/20">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {label}
            </span>
            <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                {date}
            </span>
        </div>
    );
}
