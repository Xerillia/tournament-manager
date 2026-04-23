import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';

interface SectionProps {
    title: string;
    children: ReactNode;
}

interface SubsectionProps {
    title: string;
    children: ReactNode;
}

// Reusable Section Component
function Section({ title, children }: SectionProps) {
    return (
        <div className="mb-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm md:p-10">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-2">
                {title}
                <div className="h-1 w-8 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
            </h2>
            <div className="space-y-6">{children}</div>
        </div>
    );
}

// Reusable Subsection Component
function Subsection({ title, children }: SubsectionProps) {
    return (
        <div className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-5 transition-all hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-100 dark:hover:bg-slate-700/50">
            <h3 className="mb-3 text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {title}
            </h3>
            <div className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm">{children}</div>
        </div>
    );
}

export default function Rules() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-900">
            <Head title="Tournament Rules" />
            <Navbar />

            {/* HERO HEADER */}
            <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="text-5xl leading-tight font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                        Tournament{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Rules
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-400">
                        Comprehensive regulations and code of conduct for the
                        tournament.
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-16">
                {/* General Rules */}
                <Section title="General Rules">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Subsection title="Tournament Format">
                            <ul className="list-inside list-disc space-y-2">
                                <li>
                                    2vs2 tournament format (except qualifiers).
                                </li>
                                <li>
                                    Top seed players decided by{' '}
                                    <strong>PP (Performance Points)</strong>.
                                </li>
                            </ul>
                        </Subsection>

                        <Subsection title="Player Categories">
                            <p>
                                Players are sorted into 4 categories:{' '}
                                <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                    Top, High, Low, and Unseeded
                                </span>
                                .
                            </p>
                        </Subsection>
                    </div>

                    <Subsection title="Team Composition">
                        <p className="mb-4">
                            Top seed players draft their team consisting of:
                        </p>
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-6 text-sm font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase border border-indigo-200 dark:border-indigo-800">
                            <span>• 1 Top Seed</span>
                            <span>• 1 High Seed</span>
                            <span>• 1 Low Seed</span>
                            <span>• 2 Unseeded</span>
                        </div>
                    </Subsection>

                    <Subsection title="Serpentine Draft System">
                        <p className="mb-3 text-xs italic opacity-70">
                            Draft order logic:
                        </p>
                        <div className="overflow-x-auto rounded-lg bg-slate-900 dark:bg-slate-950 p-4 font-mono text-xs text-indigo-400 border border-slate-800">
                            1,2...16 → 16,15...1 → 1,2...16 → 16,15...1
                        </div>
                    </Subsection>

                    <div className="rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30 p-6">
                        <h4 className="mb-2 text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase">
                            ⚠️ Key Restriction
                        </h4>
                        <p className="font-medium text-orange-700 dark:text-orange-300 text-sm">
                            Top and high seed players individually are{' '}
                            <span className="font-bold">
                                not allowed to play more than 2 beatmaps in a
                                row.
                            </span>
                        </p>
                    </div>
                </Section>

                {/* Mod Rules */}
                <Section title="Mod Rules">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 rounded-lg border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30 p-5">
                            <div className="text-2xl shrink-0">💡</div>
                            <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                                <strong>Tiebreaker:</strong> NoMod or Hidden
                                only. Any other mod is strictly forbidden.
                            </p>
                        </div>
                        <ul className="ml-2 list-inside list-disc space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                            <li>
                                <strong>Doubletime/Hardrock:</strong> Allowed to
                                combine with <strong>Hidden</strong>.
                            </li>
                            <li>
                                <strong>NoFail:</strong> Enforced for every map.
                            </li>
                            <li>
                                <strong>Forbidden:</strong> Easy, Flashlight,
                                Sudden Death.
                            </li>
                        </ul>
                    </div>
                </Section>

                {/* In-Game Rules */}
                <Section title="In-Game Rules">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Subsection title="Attendance">
                            <p className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-sm font-bold text-red-600 dark:text-red-400">
                                Late arrival over 10 minutes results in a
                                default loss.
                            </p>
                        </Subsection>
                        <Subsection title="Technical Issues">
                            <p>
                                Map replays allowed if issues occur within the
                                first{' '}
                                <span className="font-bold text-slate-900 dark:text-white">
                                    30 seconds
                                </span>
                                . Once per match.
                            </p>
                        </Subsection>
                        <Subsection title="Roll & Ban Phase">
                            <p>
                                Order is <strong>ABBA</strong>. Double picking
                                within the same modpool is allowed.
                            </p>
                        </Subsection>
                        <Subsection title="Conduct">
                            <div className="rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/30 p-4 text-sm font-medium text-purple-700 dark:text-purple-300 italic">
                                Respect others. Host reserves the right to
                                disqualify toxic behavior.
                            </div>
                        </Subsection>
                    </div>
                </Section>

                {/* Qualifier Procedures */}
                <Section title="Qualifier Procedures">
                    <Subsection title="Map Play & Scoring">
                        <ul className="list-inside list-disc space-y-2">
                            <li>Maps played twice (NM1 - NM2... etc).</li>
                            <li>Highest score of both playthroughs used.</li>
                            <li>
                                <strong>Sum of Placements</strong> system for
                                seeding.
                            </li>
                        </ul>
                    </Subsection>
                    <div className="mt-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 p-8 text-center border border-indigo-200 dark:border-indigo-800">
                        <p className="mb-2 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                            ⏱️ Important
                        </p>
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 italic">
                            "Between maps you have 1 minute to ready up. Be
                            prepared!"
                        </p>
                    </div>
                </Section>
            </main>

            <Footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16" />
        </div>
    );
}
