const SECTIONS = [
    {
        id: 'open',
        label: 'Registration Open',
        textColor: 'text-emerald-500',
        badge: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
        accentBorder: 'border-l-emerald-400',
        accentDot: 'bg-emerald-400',
        dateBg: 'bg-emerald-50',
        dateText: 'text-emerald-700',
    },
    {
        id: 'ongoing',
        label: 'Ongoing',
        textColor: 'text-blue-500',
        badge: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200',
        accentBorder: 'border-l-blue-400',
        accentDot: 'bg-blue-400',
        dateBg: 'bg-blue-50',
        dateText: 'text-blue-700',
    },
    {
        id: 'ended',
        label: 'Finished',
        textColor: 'text-[#8D7A7D]',
        badge: 'bg-[#382E30] text-[#8D7A7D] ring-1 ring-[#382E30]',
        accentBorder: 'border-l-stone-300',
        accentDot: 'bg-[#382E30]',
        dateBg: 'bg-[#2A2224]',
        dateText: 'text-[#8D7A7D]',
    },
];

const FILTER_PILLS = [
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Finished', value: 'ended' },
];

const TABS = [
    { id: 'overview', label: 'Overview', icon: <FileText size={14} /> },
    { id: 'rules', label: 'Rules', icon: <ScrollText size={14} /> },
    { id: 'players', label: 'Players', icon: <Users size={14} /> },
    { id: 'mappool', label: 'Mappool', icon: <List size={14} /> },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Landing({ tournaments = [] }) {
    const [selected, setSelected] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [filter, setFilter] = useState('all');

    const dataDisplay = tournaments.length > 0 ? tournaments : DUMMY_DATA;

    function openModal(t) {
        setSelected(t);
        setActiveTab('overview');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setSelected(null);
        document.body.style.overflow = '';
    }

    return (
        <div className="min-h-screen bg-[#110F0E] font-['Plus_Jakarta_Sans',_sans-serif] text-[#FCF9F9] selection:bg-[#46A9D7]/20">
            <Head title="Tournament Index" />
            <Navbar />

            {/* ── HERO ── */}
            <header className="relative border-b border-[#382E30] bg-[#2A2224] py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="text-5xl leading-[1.1] font-black tracking-tighter text-[#FCF9F9] md:text-6xl">
                        Tournament{' '}
                        <span className="text-[#46A9D7] italic underline decoration-[#46A9D7]/30 underline-offset-8">
                            Index
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-[#8D7A7D]">
                        Browse all active, ongoing, and completed osu!catch
                        tournaments. Click any card to view full details.
                    </p>

                    {/* Filter pills — mirrors mappools stage selector */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {FILTER_PILLS.map((pill) => (
                            <button
                                key={pill.value}
                                onClick={() => setFilter(pill.value)}
                                className={`rounded-full px-8 py-3 text-sm font-black transition-all ${
                                    filter === pill.value
                                        ? 'bg-[#46A9D7] text-[#110F0E] shadow-xl shadow-[#46A9D7]/30 hover:scale-105'
                                        : 'border border-[#382E30] bg-[#2A2224] text-[#8D7A7D] hover:border-[#46A9D7]/50 hover:bg-[#382E30] hover:text-[#46A9D7]'
                                }`}
                            >
                                {pill.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── TOURNAMENT LIST ── */}
            <main className="mx-auto max-w-6xl px-6 py-24">
                {SECTIONS.map((section) => {
                    const list = dataDisplay.filter(
                        (t) => t.status?.toLowerCase() === section.id,
                    );
                    if (list.length === 0) return null;
                    if (filter !== 'all' && filter !== section.id) return null;

                    return (
                        <section key={section.id} className="mb-24">
                            {/* Section heading — same pattern as mappools category */}
                            <div className="mb-14 flex flex-col items-center text-center">
                                <h2
                                    className={`text-4xl font-black tracking-tighter italic ${section.textColor}`}
                                >
                                    {section.label}
                                </h2>
                                <div className="mt-3 h-1.5 w-12 rounded-full bg-[#382E30] opacity-50" />
                            </div>

                            {/* Cards — 3-col, left accent border per status */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {list.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => openModal(t)}
                                        className={`group flex flex-col overflow-hidden rounded-2xl border border-l-4 border-[#382E30] bg-[#2A2224] text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${section.accentBorder}`}
                                    >
                                        {/* Card body */}
                                        <div className="flex flex-1 flex-col px-5 pt-5 pb-4">
                                            {/* Status + gamemode badges */}
                                            <div className="mb-3 flex flex-wrap items-center gap-1.5">
                                                <span
                                                    className={`rounded-md px-2 py-0.5 text-[9px] font-black tracking-widest uppercase ${section.badge}`}
                                                >
                                                    {section.label}
                                                </span>
                                                <span className="rounded-md bg-[#46A9D7]/20 px-2 py-0.5 text-[9px] font-black tracking-widest text-[#46A9D7] uppercase ring-1 ring-[#46A9D7]/30">
                                                    {t.gamemode ?? 'osu!catch'}
                                                </span>
                                            </div>

                                            {/* Name */}
                                            <h3 className="line-clamp-2 text-sm leading-snug font-black tracking-tight text-[#FCF9F9] transition-colors group-hover:text-[#46A9D7]">
                                                {t.name}
                                            </h3>

                                            {/* Host + rank */}
                                            <p className="mt-1.5 text-[11px] text-[#8D7A7D]">
                                                <span className="font-bold text-[#D2828F]">
                                                    {t.host.username}
                                                </span>
                                                {' · '}#{t.max_rank} –{' '}
                                                {t.min_rank}
                                            </p>

                                            {/* Date footer — subtle */}
                                            <div
                                                className={`mt-4 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold ${section.dateBg} ${section.dateText}`}
                                            >
                                                <Calendar size={11} />
                                                <span>{t.start_datetime}</span>
                                                <span className="opacity-40">
                                                    →
                                                </span>
                                                <span>
                                                    {t.end_datetime ?? '—'}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>

            <Footer className="border-t border-[#382E30] bg-[#1A1618]" />

            {/* ── MODAL ── */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[38px] bg-white shadow-2xl ring-1 ring-black/5 sm:rounded-[38px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="relative shrink-0 overflow-hidden bg-[#2A2224] px-8 pt-8 pb-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950" />

                            <div className="relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-0 right-0 rounded-full p-1.5 text-[#8D7A7D] transition-colors hover:bg-[#382E30] hover:text-[#FCF9F9]"
                                >
                                    <X size={16} />
                                </button>

                                {/* Badges */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {selected.gamemode && (
                                        <span className="rounded-xl bg-[#46A9D7]/20 px-3 py-1 text-[10px] font-black tracking-widest text-[#46A9D7] uppercase">
                                            {selected.gamemode}
                                        </span>
                                    )}
                                    <span
                                        className={`rounded-xl px-3 py-1 text-[10px] font-black tracking-widest uppercase ring-1 ${
                                            SECTIONS.find(
                                                (s) => s.id === selected.status,
                                            )?.badge ??
                                            'bg-[#382E30] text-[#8D7A7D] ring-[#382E30]'
                                        }`}
                                    >
                                        {selected.status}
                                    </span>
                                </div>

                                <p className="mb-1 text-[10px] font-black tracking-[0.4em] text-orange-400 uppercase">
                                    Hosted by {selected.host.username}
                                </p>
                                <h2 className="text-2xl leading-snug font-black tracking-tight text-white">
                                    {selected.name}
                                </h2>
                                {selected.caption && (
                                    <p className="mt-1 text-sm font-semibold text-stone-400 italic">
                                        "{selected.caption}"
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="shrink-0 border-b border-stone-100 bg-white px-8">
                            <div className="flex gap-1 pt-3">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-1.5 rounded-t-xl px-4 py-2.5 text-xs font-black transition-all ${
                                            activeTab === tab.id
                                                ? 'border border-b-0 border-stone-200 bg-stone-50 text-stone-900'
                                                : 'text-stone-400 hover:text-stone-600'
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Register CTA — only when open */}
                        {selected.status === 'open' && (
                            <div className="shrink-0 border-b border-stone-100 bg-emerald-50 px-8 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-black text-emerald-700">
                                            Registration is open!
                                        </p>
                                        <p className="text-[11px] text-emerald-600">
                                            Closes on{' '}
                                            {selected.end_datetime ?? '—'}
                                        </p>
                                    </div>
                                    <a
                                        href={selected.forum_post ?? '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-md"
                                    >
                                        Register Now
                                        <svg
                                            className="size-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Modal body */}
                        <div className="overflow-y-auto bg-stone-50 p-8">
                            {/* ── OVERVIEW TAB ── */}
                            {activeTab === 'overview' && (
                                <div className="space-y-5">
                                    {/* Stat grid */}
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        <ModalStatBox
                                            label="Host"
                                            value={selected.host.username}
                                            icon={<Shield size={15} />}
                                        />
                                        <ModalStatBox
                                            label="Rank Range"
                                            value={`#${selected.max_rank} – ${selected.min_rank}`}
                                            icon={<Hash size={15} />}
                                        />
                                        <ModalStatBox
                                            label="Status"
                                            value={
                                                selected.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                selected.status.slice(1)
                                            }
                                            icon={<Clock size={15} />}
                                        />
                                        <ModalStatBox
                                            label="Start Date"
                                            value={selected.start_datetime}
                                            icon={<Calendar size={15} />}
                                        />
                                        <ModalStatBox
                                            label="End Date"
                                            value={selected.end_datetime ?? '—'}
                                            icon={<CalendarCheck size={15} />}
                                        />
                                        <ModalStatBox
                                            label="Gamemode"
                                            value={
                                                selected.gamemode ?? 'osu!catch'
                                            }
                                            icon={<Gamepad2 size={15} />}
                                        />
                                    </div>

                                    {/* External links */}
                                    {(selected.forum_post ||
                                        selected.groupchat ||
                                        selected.livestream ||
                                        selected.vod) && (
                                        <div className="space-y-2">
                                            <p className="px-1 text-[10px] font-black tracking-widest text-stone-400 uppercase">
                                                External Links
                                            </p>
                                            {selected.forum_post && (
                                                <SocialButton
                                                    url={selected.forum_post}
                                                    platform="Forum Post"
                                                    icon={<Link2 size={15} />}
                                                />
                                            )}
                                            {selected.groupchat && (
                                                <SocialButton
                                                    url={selected.groupchat}
                                                    platform={
                                                        selected.groupchat_platform
                                                    }
                                                    icon={
                                                        <MessageSquare
                                                            size={15}
                                                        />
                                                    }
                                                />
                                            )}
                                            {selected.livestream && (
                                                <SocialButton
                                                    url={selected.livestream}
                                                    platform={
                                                        selected.livestream_platform
                                                    }
                                                    icon={<Tv size={15} />}
                                                />
                                            )}
                                            {selected.vod && (
                                                <SocialButton
                                                    url={selected.vod}
                                                    platform={
                                                        selected.vod_platform ??
                                                        'YouTube'
                                                    }
                                                    icon={<Youtube size={15} />}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── RULES TAB ── */}
                            {activeTab === 'rules' && (
                                <div className="space-y-5">
                                    {/* Regulations */}
                                    {selected.rules ? (
                                        <div className="rounded-2xl border border-stone-200 bg-white p-6">
                                            <h3 className="mb-3 text-[10px] font-black tracking-widest text-orange-500 uppercase">
                                                Regulations
                                            </h3>
                                            <p className="text-sm leading-relaxed whitespace-pre-line text-stone-600">
                                                {selected.rules}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border border-stone-200 bg-white p-6">
                                            <p className="text-sm text-stone-400 italic">
                                                No regulations posted yet.
                                            </p>
                                        </div>
                                    )}

                                    {/* Prize pool */}
                                    <div className="rounded-2xl border border-stone-200 bg-white p-6">
                                        <h3 className="mb-4 text-[10px] font-black tracking-widest text-orange-500 uppercase">
                                            Prize Pool
                                        </h3>
                                        {selected.prize_pool &&
                                        selected.prize_pool.length > 0 ? (
                                            <div className="space-y-2">
                                                {selected.prize_pool.map(
                                                    (entry, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                                                                idx === 0
                                                                    ? 'bg-yellow-50 ring-1 ring-yellow-200'
                                                                    : idx === 1
                                                                      ? 'bg-stone-50 ring-1 ring-stone-200'
                                                                      : idx ===
                                                                          2
                                                                        ? 'bg-orange-50 ring-1 ring-orange-200'
                                                                        : 'bg-stone-50 ring-1 ring-stone-100'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Medal
                                                                    size={16}
                                                                    className={
                                                                        idx ===
                                                                        0
                                                                            ? 'text-yellow-400'
                                                                            : idx ===
                                                                                1
                                                                              ? 'text-stone-400'
                                                                              : idx ===
                                                                                  2
                                                                                ? 'text-orange-400'
                                                                                : 'text-stone-300'
                                                                    }
                                                                />
                                                                <span className="text-sm font-black text-stone-700">
                                                                    {
                                                                        entry.place
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-bold text-stone-600">
                                                                {entry.prize}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-stone-400 italic">
                                                No prize pool announced yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── PLAYERS TAB ── */}
                            {activeTab === 'players' && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between px-1">
                                        <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase">
                                            Registered Players
                                        </p>
                                        {selected.players && (
                                            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-black text-stone-500">
                                                {selected.players.length}{' '}
                                                registered
                                            </span>
                                        )}
                                    </div>

                                    {selected.players &&
                                    selected.players.length > 0 ? (
                                        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                                            {selected.players.map((p, idx) => (
                                                <div
                                                    key={p.username}
                                                    className={`flex items-center justify-between px-5 py-3 ${
                                                        idx !== 0
                                                            ? 'border-t border-stone-100'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-5 text-center text-[11px] font-black text-stone-300">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-base leading-none">
                                                            {p.country}
                                                        </span>
                                                        <span className="text-sm font-bold text-stone-800">
                                                            {p.username}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs font-black text-stone-400">
                                                        #{p.rank}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
                                            <Users
                                                size={32}
                                                className="mx-auto mb-3 text-stone-200"
                                            />
                                            <p className="text-sm font-black text-stone-400 uppercase">
                                                No players registered yet
                                            </p>
                                            <p className="mt-1 text-xs text-stone-400 italic">
                                                Registration is still open.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── MAPPOOL TAB ── */}
                            {activeTab === 'mappool' && (
                                <div className="space-y-4">
                                    {selected.mappool &&
                                    selected.mappool.length > 0 ? (
                                        selected.mappool.map((group) => (
                                            <div key={group.category}>
                                                {/* Category header */}
                                                <div className="mb-2 flex items-center gap-2 px-1">
                                                    <span
                                                        className={`rounded-lg px-2.5 py-1 text-[10px] font-black tracking-widest uppercase ${group.color}`}
                                                    >
                                                        {group.category}
                                                    </span>
                                                    <span className="text-[10px] font-black text-stone-400">
                                                        {group.maps.length} map
                                                        {group.maps.length > 1
                                                            ? 's'
                                                            : ''}
                                                    </span>
                                                </div>

                                                {/* Maps */}
                                                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                                                    {group.maps.map(
                                                        (map, idx) => (
                                                            <div
                                                                key={map.id}
                                                                className={`flex items-center gap-4 px-5 py-3.5 ${
                                                                    idx !== 0
                                                                        ? 'border-t border-stone-100'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {/* ID badge */}
                                                                <span
                                                                    className={`w-10 shrink-0 rounded-lg px-1.5 py-1 text-center text-[10px] font-black uppercase ${group.color}`}
                                                                >
                                                                    {map.id}
                                                                </span>

                                                                {/* Title + mapper */}
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-bold text-stone-800">
                                                                        {
                                                                            map.title
                                                                        }
                                                                    </p>
                                                                    <p className="truncate text-[11px] text-stone-400">
                                                                        {
                                                                            map.artist
                                                                        }
                                                                        <span className="mx-1 opacity-40">
                                                                            ·
                                                                        </span>
                                                                        mapped
                                                                        by{' '}
                                                                        <span className="font-semibold text-stone-500">
                                                                            {
                                                                                map.mapper
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                </div>

                                                                {/* Stats */}
                                                                <div className="flex shrink-0 items-center gap-3 text-right">
                                                                    <div>
                                                                        <p className="text-[9px] font-black tracking-widest text-stone-400 uppercase">
                                                                            SR
                                                                        </p>
                                                                        <p className="text-sm font-black text-stone-800">
                                                                            {
                                                                                map.sr
                                                                            }
                                                                            <span className="text-orange-400">
                                                                                ★
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[9px] font-black tracking-widest text-stone-400 uppercase">
                                                                            BPM
                                                                        </p>
                                                                        <p className="text-sm font-black text-stone-800">
                                                                            {
                                                                                map.bpm
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white py-16 text-center">
                                            <Swords
                                                size={36}
                                                className="mb-4 text-stone-200"
                                            />
                                            <h3 className="text-sm font-black tracking-tight text-stone-700 uppercase">
                                                Mappool not released yet
                                            </h3>
                                            <p className="mt-1 text-xs text-stone-400 italic">
                                                Check back when the tournament
                                                starts.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function StatBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="group flex flex-col items-center rounded-2xl border border-transparent bg-stone-50/80 px-2 py-4 transition-all hover:border-orange-100 hover:bg-white">
            <span className="mb-1.5 text-[9px] font-black text-stone-400 uppercase group-hover:text-orange-400">
                {label}
            </span>
            <span className="text-sm font-black tracking-tight text-stone-800">
                {value}
            </span>
        </div>
    );
}

function ModalStatBox({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1 rounded-2xl border border-stone-200 bg-white p-4">
            <div className="text-stone-300">{icon}</div>
            <div className="text-[9px] font-black tracking-widest text-stone-400 uppercase">
                {label}
            </div>
            <div className="text-xs font-bold text-stone-800">{value}</div>
        </div>
    );
}

function SocialButton({
    url,
    platform,
    icon,
}: {
    url: string;
    platform: string;
    icon: React.ReactNode;
}) {
    if (!url) return null;
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-5 py-3.5 transition-colors hover:bg-stone-50"
        >
            <div className="flex items-center gap-3 text-stone-600">
                {icon}
                <span className="text-sm font-bold">{platform}</span>
            </div>
            <ExternalLink size={13} className="text-stone-300" />
        </a>
    );
}
