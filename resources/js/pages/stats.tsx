import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { cn } from '@/lib/utils';
import { Trophy, Download, FileArchive } from 'lucide-react';

interface Player {
    rank: number;
    username: string;
    country: string;
    avg_score: number;
    accuracy: number;
    consistency: number;
    maps_played: number;
    matches_played: number;
}

interface MapStat {
    id: string;
    title: string;
    artist: string;
    category: string;
    color: string;
    avg_score: number;
    pass_rate: number;
    picks: number | null;
    bans: number | null;
}

interface TopScore {
    rank: number;
    username: string;
    country: string;
    score: number;
    accuracy: number;
}

const PLAYERS: Player[] = [
    { rank: 1, username: 'Jemzuu', country: '🇯🇵', avg_score: 1_254_320, accuracy: 99.12, consistency: 94, maps_played: 6, matches_played: 6 },
    { rank: 2, username: 'ekr-', country: '🇰🇷', avg_score: 1_238_760, accuracy: 98.97, consistency: 91, maps_played: 6, matches_played: 6 },
    { rank: 3, username: 'Maitoo', country: '🇦🇺', avg_score: 1_221_480, accuracy: 98.8, consistency: 89, maps_played: 6, matches_played: 6 },
    { rank: 4, username: 'Predominador', country: '🇵🇭', avg_score: 1_209_340, accuracy: 98.65, consistency: 87, maps_played: 6, matches_played: 6 },
    { rank: 5, username: 'YesMyDarknesss', country: '🇮🇩', avg_score: 1_195_210, accuracy: 98.54, consistency: 85, maps_played: 6, matches_played: 6 },
    { rank: 6, username: 'dika312', country: '🇮🇩', avg_score: 1_182_660, accuracy: 98.41, consistency: 83, maps_played: 6, matches_played: 6 },
    { rank: 7, username: 'Xinnoh', country: '🇸🇬', avg_score: 1_170_900, accuracy: 98.28, consistency: 81, maps_played: 6, matches_played: 6 },
    { rank: 8, username: 'Hareimu', country: '🇲🇾', avg_score: 1_158_440, accuracy: 98.1, consistency: 79, maps_played: 6, matches_played: 6 },
    { rank: 9, username: 'Bunnrei', country: '🇰🇭', avg_score: 1_144_320, accuracy: 97.95, consistency: 77, maps_played: 6, matches_played: 6 },
    { rank: 10, username: 'Taiyi', country: '🇨🇳', avg_score: 1_130_780, accuracy: 97.82, consistency: 75, maps_played: 6, matches_played: 6 },
];

const NM_COLOR = 'bg-[#5B4E4C] text-[#FCF9F9]';
const HD_COLOR = 'bg-yellow-600/40 text-yellow-300';
const HR_COLOR = 'bg-red-600/40 text-red-300';
const DT_COLOR = 'bg-blue-600/40 text-blue-300';

const MAPS: MapStat[] = [
    { id: 'NM1', title: 'Artificial Stars', artist: 'Silentroom', category: 'NoMod', color: NM_COLOR, avg_score: 1_220_400, pass_rate: 95, picks: 12, bans: 2 },
    { id: 'NM2', title: 'Night of Knights', artist: 'FLOWREATING', category: 'NoMod', color: NM_COLOR, avg_score: 1_185_300, pass_rate: 91, picks: 10, bans: 4 },
    { id: 'HD1', title: 'Yoru ni Kakeru', artist: 'YOASOBI', category: 'Hidden', color: HD_COLOR, avg_score: 1_095_800, pass_rate: 88, picks: 9, bans: 5 },
    { id: 'HR1', title: 'Firestorm', artist: 'Camellia', category: 'HardRock', color: HR_COLOR, avg_score: 1_055_200, pass_rate: 82, picks: 6, bans: 8 },
    { id: 'DT1', title: 'Senbonzakura', artist: 'Hatsune Miku', category: 'DoubleTime', color: DT_COLOR, avg_score: 1_033_700, pass_rate: 79, picks: 11, bans: 3 },
];

const TOP_SCORES: TopScore[] = [
    { rank: 1, username: 'Jemzuu', country: '🇯🇵', score: 1_354_210, accuracy: 99.78 },
    { rank: 2, username: 'ekr-', country: '🇰🇷', score: 1_342_880, accuracy: 99.61 },
    { rank: 3, username: 'Maitoo', country: '🇦🇺', score: 1_330_510, accuracy: 99.44 },
    { rank: 4, username: 'Predominador', country: '🇵🇭', score: 1_318_220, accuracy: 99.27 },
    { rank: 5, username: 'YesMyDarknesss', country: '🇮🇩', score: 1_305_990, accuracy: 99.1 },
];

interface MappackFile {
    beatmapId: string;
    title: string;
    artist: string;
    mapper: string;
    difficulty: string;
    downloadUrl: string;
}

const MAPPACK_QUALIFIERS: MappackFile[] = [
    { beatmapId: '123456', title: 'Artificial Stars', artist: 'Silentroom', mapper: 'Ascendance', difficulty: 'Platter', downloadUrl: 'https://beatconnect.io/b/123456' },
    { beatmapId: '123457', title: 'Night of Knights', artist: 'FLOWREATING', mapper: 'Tails', difficulty: 'Salad', downloadUrl: 'https://beatconnect.io/b/123457' },
    { beatmapId: '123458', title: 'ouroboros', artist: 'Silentroom vs Frums', mapper: 'Yumeno Himiko', difficulty: 'Rain', downloadUrl: 'https://beatconnect.io/b/123458' },
    { beatmapId: '123459', title: 'Yoru ni Kakeru', artist: 'YOASOBI', mapper: 'Sinnoh', difficulty: 'Platter', downloadUrl: 'https://beatconnect.io/b/123459' },
    { beatmapId: '123460', title: 'Firestorm', artist: 'Camellia', mapper: 'Jemzuu', difficulty: 'Rain', downloadUrl: 'https://beatconnect.io/b/123460' },
    { beatmapId: '123461', title: 'Senbonzakura', artist: 'Hatsune Miku', mapper: 'Kukkai', difficulty: 'Platter', downloadUrl: 'https://beatconnect.io/b/123461' },
];

export default function Stats() {
    const [activeTab, setActiveTab] = useState<'players' | 'maps' | 'scores' | 'download'>('players');
    const [sortBy, setSortBy] = useState<'rank' | 'score' | 'accuracy'>('rank');

    const sortedPlayers = [...PLAYERS].sort((a, b) => {
        if (sortBy === 'rank') return a.rank - b.rank;
        if (sortBy === 'score') return b.avg_score - a.avg_score;
        return b.accuracy - a.accuracy;
    });

    const downloadMappack = async () => {
        const mappackData = {
            title: 'Tournament Qualifiers Mappack',
            version: '1.0',
            date: new Date().toISOString(),
            maps: MAPPACK_QUALIFIERS.map(map => ({
                beatmapId: map.beatmapId,
                title: map.title,
                artist: map.artist,
                mapper: map.mapper,
                difficulty: map.difficulty,
            })),
        };

        const dataStr = JSON.stringify(mappackData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tournament-mappack-${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#110F0E] font-['Plus_Jakarta_Sans',_sans-serif] text-[#FCF9F9]">
            <Head title="Tournament Statistics - FISH" />
            <Navbar />

            <header className="relative border-b border-[#382E30] bg-[#2A2224] py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="text-5xl font-black tracking-tighter text-[#FCF9F9] md:text-6xl">
                        Tournament <span className="text-[#46A9D7] italic underline decoration-[#46A9D7]/30 underline-offset-8">Statistics</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-[#8D7A7D]">Real-time player rankings, map statistics, and performance metrics.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        {(['players', 'maps', 'scores', 'download'] as const).map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-6 py-2.5 text-[11px] font-black uppercase transition-all', activeTab === tab ? 'bg-[#46A9D7] text-[#110F0E] shadow-lg' : 'border border-[#382E30] bg-[#2A2224] text-[#8D7A7D] hover:border-[#46A9D7]/50')}>
                                {tab === 'players' ? 'Rankings' : tab === 'maps' ? 'Mappool' : tab === 'scores' ? 'Top Scores' : 'Downloads'}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-16">
                {activeTab === 'players' && (
                    <section>
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tighter text-[#FCF9F9] uppercase italic">Player Rankings</h2>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'rank' | 'score' | 'accuracy')} className="border border-[#382E30] bg-[#2A2224] px-4 py-2 text-sm text-[#FCF9F9] hover:border-[#46A9D7]/50">
                                <option value="rank">Sort by Rank</option>
                                <option value="score">Sort by Score</option>
                                <option value="accuracy">Sort by Accuracy</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            {sortedPlayers.map((player) => (
                                <div key={player.rank} className="border border-[#382E30] bg-[#2A2224] p-4 transition-all hover:border-[#46A9D7]/50 hover:bg-[#382E30]/50">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="flex h-10 w-10 items-center justify-center bg-[#46A9D7]/20 text-[#46A9D7] font-black">#{player.rank}</div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-[#FCF9F9]">{player.username}</p>
                                                <p className="text-sm text-[#8D7A7D]">{player.country}</p>
                                            </div>
                                        </div>
                                        <div className="hidden gap-8 text-right sm:flex">
                                            <div>
                                                <p className="text-xs text-[#8D7A7D] uppercase">Avg Score</p>
                                                <p className="font-bold text-[#FCF9F9]">{player.avg_score.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8D7A7D] uppercase">Accuracy</p>
                                                <p className="font-bold text-[#46A9D7]">{player.accuracy.toFixed(2)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8D7A7D] uppercase">Consistency</p>
                                                <p className="font-bold text-[#FCF9F9]">{player.consistency}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8D7A7D] uppercase">Maps</p>
                                                <p className="font-bold text-[#FCF9F9]">{player.maps_played}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'maps' && (
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black tracking-tighter text-[#FCF9F9] uppercase italic">Mappool Statistics</h2>
                            <p className="mt-2 text-[#8D7A7D]">Difficulty, pass rates, and pick/ban frequency</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {MAPS.map((map) => (
                                <div key={map.id} className="border border-[#382E30] bg-[#2A2224] p-6 transition-all hover:border-[#46A9D7]/50 hover:bg-[#382E30]/50">
                                    <div className="mb-4">
                                        <p className={`mb-1 inline-block px-2 py-1 text-xs font-bold ${map.color}`}>{map.category}</p>
                                        <h3 className="text-lg font-bold text-[#FCF9F9]">{map.title}</h3>
                                        <p className="text-sm text-[#8D7A7D]">{map.artist}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-[#8D7A7D]">Avg Score</span>
                                            <span className="font-bold text-[#FCF9F9]">{map.avg_score.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#8D7A7D]">Pass Rate</span>
                                            <span className="font-bold text-green-400">{map.pass_rate}%</span>
                                        </div>
                                        {map.picks !== null && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-[#8D7A7D]">Picks</span>
                                                    <span className="font-bold text-blue-400">{map.picks}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-[#8D7A7D]">Bans</span>
                                                    <span className="font-bold text-red-400">{map.bans}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'scores' && (
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black tracking-tighter text-[#FCF9F9] uppercase italic">Top Scores</h2>
                            <p className="mt-2 text-[#8D7A7D]">Best performances from the tournament</p>
                        </div>
                        <div className="space-y-3">
                            {TOP_SCORES.map((score) => (
                                <div key={score.rank} className="border border-[#382E30] bg-[#2A2224] p-4 transition-all hover:border-[#46A9D7]/50 hover:bg-[#382E30]/50">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <Trophy className={cn('h-6 w-6', score.rank === 1 ? 'text-yellow-500' : score.rank === 2 ? 'text-gray-400' : score.rank === 3 ? 'text-orange-600' : 'text-[#46A9D7]')} />
                                            <div>
                                                <p className="font-bold text-[#FCF9F9]">{score.username}</p>
                                                <p className="text-sm text-[#8D7A7D]">{score.country}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-[#8D7A7D] uppercase">Score</p>
                                            <p className="font-bold text-[#FCF9F9]">{score.score.toLocaleString()}</p>
                                            <p className="mt-1 text-xs font-medium text-[#46A9D7]">{score.accuracy.toFixed(2)}% Acc</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'download' && (
                    <section>
                        <div className="mb-12">
                            <h2 className="text-2xl font-black tracking-tighter text-[#FCF9F9] uppercase italic mb-4">Download Mappack</h2>
                            <p className="text-[#8D7A7D] mb-8">Download the complete tournament mappool containing all qualifiers maps in one convenient file.</p>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="border border-[#382E30] bg-[#2A2224] p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4 flex items-center gap-3">
                                            <FileArchive className="h-6 w-6 text-[#46A9D7]" />
                                            <h3 className="text-lg font-bold text-[#FCF9F9]">Qualifiers Mappack</h3>
                                        </div>
                                        <p className="text-sm text-[#8D7A7D] mb-4">All tournament qualifier maps bundled together</p>
                                        <div className="mb-6 space-y-2 text-sm text-[#8D7A7D]">
                                            <p>📦 Maps: {MAPPACK_QUALIFIERS.length}</p>
                                            <p>💾 Format: JSON manifest</p>
                                            <p>✅ Ready to import</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={downloadMappack}
                                        className="flex items-center justify-center gap-2 bg-[#46A9D7] px-6 py-3 font-black text-[#110F0E] uppercase transition-all hover:bg-[#46A9D7]/90 shadow-lg"
                                    >
                                        <Download className="h-5 w-5" />
                                        Download Maps
                                    </button>
                                </div>

                                <div className="border border-[#382E30] bg-[#2A2224] p-8">
                                    <h3 className="text-lg font-bold text-[#FCF9F9] mb-4">Maps Included</h3>
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {MAPPACK_QUALIFIERS.map((map, idx) => (
                                            <div key={idx} className="border-l-2 border-[#46A9D7] pl-3 py-2">
                                                <p className="font-semibold text-[#FCF9F9] text-sm">{map.title}</p>
                                                <p className="text-xs text-[#8D7A7D]">{map.artist} • {map.difficulty}</p>
                                                <p className="text-xs text-[#46A9D7] mt-1">Mapped by {map.mapper}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
