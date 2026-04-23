import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { cn } from '@/lib/utils';
import RegistrationModal from '@/components/RegistrationModal';
import CommentsSection from '@/components/CommentsSection';
import PlayersSearchFilter from '@/components/PlayersSearchFilter';
import MappoolPreviewModal from '@/components/MappoolPreviewModal';
import StaffActionsWidget from '@/components/StaffActionsWidget';
import {
    Calendar,
    MessageSquare,
    Tv,
    FileText,
    Users,
    ArrowLeft,
    ExternalLink,
    Clock,
    Gamepad2,
    List,
    Medal,
    Youtube,
    ShieldCheck,
    Trophy,
    Mic,
    MonitorPlay,
    BarChart3,
    Crown,
    Star,
    Zap,
    LogIn,
    Users2,
    LinkIcon,
    Radio,
    HelpCircle,
    Download,
} from 'lucide-react';

// ── MOD CONFIGURATION ────────────────────────────────────────────────────────

const MOD_CONFIG: Record<
    string,
    { accent: string; text: string; bg: string; label: string }
> = {
    NM: {
        accent: 'border-l-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-500',
        label: 'NoMod',
    },
    HD: {
        accent: 'border-l-yellow-400',
        text: 'text-yellow-600',
        bg: 'bg-yellow-400',
        label: 'Hidden',
    },
    HR: {
        accent: 'border-l-red-500',
        text: 'text-red-600',
        bg: 'bg-red-500',
        label: 'HardRock',
    },
    DT: {
        accent: 'border-l-cyan-500',
        text: 'text-cyan-600',
        bg: 'bg-cyan-500',
        label: 'DoubleTime',
    },
    FM: {
        accent: 'border-l-green-500',
        text: 'text-green-600',
        bg: 'bg-green-500',
        label: 'FreeMod',
    },
    TB: {
        accent: 'border-l-orange-500',
        text: 'text-orange-500',
        bg: 'bg-orange-500',
        label: 'Tiebreaker',
    },
};

// ── SKILLSET STYLES ──────────────────────────────────────────────────────────

const SKILL_STYLE: Record<string, string> = {
    Jump: 'bg-orange-100 text-orange-600',
    Alt: 'bg-blue-100 text-blue-600',
    Stream: 'bg-cyan-100 text-cyan-700',
    Tech: 'bg-purple-100 text-purple-600',
    FingCon: 'bg-pink-100 text-pink-600',
    Wiggle: 'bg-teal-100 text-teal-600',
    'Low AR': 'bg-indigo-100 text-indigo-600',
    Speed: 'bg-yellow-100 text-yellow-700',
    Stacking: 'bg-rose-100 text-rose-600',
    Precision: 'bg-red-100 text-red-600',
    Reading: 'bg-green-100 text-green-700',
    Deathstream: 'bg-slate-100 text-slate-700',
};

// ── BEATMAP DATA ──────────────────────────────────────────────────────────────

const BEATMAP_COVERS = [
    'https://assets.ppy.sh/beatmaps/1011055/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1410543/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/892790/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1046040/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1345734/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1592095/covers/cover.jpg',
];

interface MapEntry {
    id: string;
    title: string;
    artist: string;
    mapper: string;
    difficulty: string;
    sr: string;
    bpm: string;
    length: string;
    cs: string;
    ar: string;
    cover: string;
    skillset: string[];
}

interface ModGroup {
    mod: 'NM' | 'HD' | 'HR' | 'DT' | 'FM' | 'TB';
    maps: MapEntry[];
}

interface StagePool {
    id: string;
    label: string;
    groups: ModGroup[];
}

function createMap(
    id: string,
    title: string,
    artist: string,
    mapper: string,
    diff: string,
    sr: string,
    bpm: string,
    len: string,
    cs: string,
    ar: string,
    coverIdx: number,
    skillset: string[],
): MapEntry {
    return {
        id,
        title,
        artist,
        mapper,
        difficulty: diff,
        sr,
        bpm,
        length: len,
        cs,
        ar,
        cover: BEATMAP_COVERS[coverIdx % BEATMAP_COVERS.length],
        skillset,
    };
}

const TOURNAMENT_STAGES: StagePool[] = [
    {
        id: 'qualifiers',
        label: 'Qualifiers',
        groups: [
            {
                mod: 'NM',
                maps: [
                    createMap('NM1', 'First Storm', 'DECO*27', '-Miya', "Alerr's OD", '5.62', '190', '03:46', '4.3', '9.4', 0, ['Jump', 'Alt']),
                    createMap('NM2', 'Night of Knights', 'FLOWREATING', 'Alheak', 'Extra', '5.45', '180', '03:12', '4.0', '9.3', 1, ['Stream', 'Speed']),
                    createMap('NM3', 'Ouroboros', 'Silentroom×Frums', 'Minato Yukina', 'Calamity', '6.12', '240', '04:02', '4.0', '9.5', 2, ['Tech', 'Reading']),
                    createMap('NM4', 'Grievous Lady', 'Team Grimoire', 'Spectator', 'Phantasm', '6.54', '222', '03:55', '3.8', '9.5', 3, ['Wiggle', 'FingCon']),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    createMap('HD1', 'Yoru ni Kakeru', 'YOASOBI', 'Bunnrei', 'Dusk', '5.74', '130', '03:33', '4.0', '9.2', 4, ['Low AR', 'Jump']),
                    createMap('HD2', 'Renegade', 'Aaryn', 'Taiyi', 'Rebellion', '6.12', '200', '03:48', '3.5', '9.0', 5, ['Low AR', 'Reading']),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    createMap('HR1', 'Firestorm', 'Camellia', 'Hareimu', 'Inferno', '6.88', '260', '03:20', '5.5', '10.0', 1, ['Stream', 'Speed']),
                    createMap('HR2', 'Chronostasis', 'xi', 'Xinnoh', 'Pleiades', '6.33', '195', '03:44', '5.0', '10.0', 2, ['Jump', 'Alt']),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    createMap('DT1', 'Senbonzakura', 'Hatsune Miku', 'ekr-', 'Overdose', '7.11', '238 (158)', '03:55', '4.0', '10.3', 4, ['Stream', 'Deathstream']),
                    createMap('DT2', 'Freedom Dive', 'xi', 'Spectator', 'FOUR DIMENSIONS', '8.03', '222 (148)', '03:48', '3.5', '10.5', 3, ['Deathstream', 'Alt']),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    createMap('FM1', 'Artificial Stars', 'Silentroom', 'Jemzuu', 'Illumination', '5.88', '175', '04:10', '4.2', '9.1', 0, ['Precision', 'Tech']),
                ],
            },
        ],
    },
    {
        id: 'ro16',
        label: 'Round of 16',
        groups: [
            {
                mod: 'NM',
                maps: [
                    createMap('NM1', 'First Storm', 'DECO*27', '-Miya', "Alerr's OD", '5.62', '190', '03:46', '4.3', '9.4', 0, ['Jump', 'Alt']),
                    createMap('NM2', 'Night of Knights', 'FLOWREATING', 'Alheak', 'Extra', '5.88', '186', '03:28', '4.0', '9.4', 1, ['Stream', 'Speed']),
                    createMap('NM3', 'Ouroboros', 'Silentroom×Frums', 'Minato Yukina', 'Calamity', '6.23', '240', '04:02', '4.0', '9.5', 2, ['Tech', 'Reading']),
                    createMap('NM4', 'Grievous Lady', 'Team Grimoire', 'Spectator', 'Phantasm', '6.67', '222', '03:55', '3.8', '9.5', 3, ['Wiggle', 'FingCon']),
                    createMap('NM5', 'Sayonara Heaven', 'n-buna', 'Jemzuu', 'Eternity', '6.88', '210', '04:18', '3.5', '9.6', 5, ['Jump', 'Precision']),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    createMap('HD1', 'Yoru ni Kakeru', 'YOASOBI', 'Bunnrei', 'Dusk', '5.74', '130', '03:33', '4.0', '9.2', 4, ['Low AR', 'Jump']),
                    createMap('HD2', 'Renegade', 'Aaryn', 'Taiyi', 'Rebellion', '6.18', '200', '03:48', '3.5', '9.0', 5, ['Low AR', 'Reading']),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    createMap('HR1', 'Firestorm', 'Camellia', 'Hareimu', 'Inferno', '6.88', '260', '03:20', '5.5', '10.0', 1, ['Stream', 'Speed']),
                    createMap('HR2', 'Chronostasis', 'xi', 'Xinnoh', 'Pleiades', '6.41', '198', '03:44', '5.0', '10.0', 2, ['Jump', 'Alt']),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    createMap('DT1', 'Senbonzakura', 'Hatsune Miku', 'ekr-', 'Overdose', '7.11', '238 (158)', '03:55', '4.0', '10.3', 4, ['Stream', 'Deathstream']),
                    createMap('DT2', 'Freedom Dive', 'xi', 'Spectator', 'FOUR DIMENSIONS', '8.03', '222 (148)', '03:48', '3.5', '10.5', 3, ['Deathstream', 'Alt']),
                    createMap('DT3', 'World Vanquisher', 'Camellia', 'Maitoo', 'Conqueror', '7.55', '204 (136)', '04:22', '4.0', '10.0', 0, ['Jump', 'Reading']),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    createMap('FM1', 'Artificial Stars', 'Silentroom', 'Jemzuu', 'Illumination', '5.88', '175', '04:10', '4.2', '9.1', 0, ['Precision', 'Tech']),
                    createMap('FM2', 'Burning Embers', 'Silentroom', 'Hareimu', 'Scorched', '6.22', '185', '03:52', '4.0', '9.3', 1, ['Stacking', 'Wiggle']),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    createMap('TB', 'Last Regrets', 'Silentroom', 'Maitoo & Jemzuu', 'Requiem', '8.91', '280', '06:12', '4.0', '9.8', 3, ['Jump', 'Stream', 'Tech']),
                ],
            },
        ],
    },
    {
        id: 'qf-sf',
        label: 'Quarterfinals / Semifinals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    createMap('NM1', 'Crimson Throne', 'Silentroom', 'Jemzuu', 'Imperial', '6.44', '210', '04:10', '4.0', '9.6', 0, ['Jump', 'Alt']),
                    createMap('NM2', 'Hollow Paradox', 'Camellia', 'Hareimu', 'Void', '6.66', '220', '03:58', '3.8', '9.6', 1, ['Stream', 'Precision']),
                    createMap('NM3', 'Neon Vertigo', 'xi', 'ekr-', 'Cascade', '6.88', '235', '04:22', '3.6', '9.7', 2, ['Tech', 'Reading']),
                    createMap('NM4', 'Stellar Collapse', 'FLOWREATING', 'Spectator', 'Supernova', '7.12', '248', '03:55', '3.5', '9.7', 3, ['Wiggle', 'FingCon']),
                    createMap('NM5', 'Last Resonance', 'n-buna', 'Maitoo', 'Resonance', '7.44', '225', '04:30', '3.5', '9.8', 4, ['Jump', 'Deathstream']),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    createMap('HD1', 'Fade to White', 'YOASOBI', 'Bunnrei', 'Whiteout', '6.22', '140', '03:45', '4.0', '9.0', 5, ['Low AR', 'Jump']),
                    createMap('HD2', 'Phantom Signal', 'Aaryn', 'Taiyi', 'Ghost', '6.55', '212', '04:00', '3.5', '8.8', 0, ['Low AR', 'Reading']),
                    createMap('HD3', 'Dark Orbit', 'xi', 'Xinnoh', 'Eclipse', '6.88', '185', '04:15', '3.8', '8.6', 1, ['Low AR', 'Tech']),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    createMap('HR1', 'Blazing Fury', 'Camellia', 'Hareimu', 'Conflagration', '7.33', '272', '03:28', '5.5', '10.0', 2, ['Stream', 'Speed']),
                    createMap('HR2', 'Iron Resolve', 'xi', 'Xinnoh', 'Adamant', '6.99', '205', '03:55', '5.0', '10.0', 3, ['Jump', 'Alt']),
                    createMap('HR3', 'Cascade Effect', 'Cash Cash', 'Nelly', 'Overload', '6.66', '182', '04:05', '5.2', '9.9', 4, ['Alt', 'FingCon']),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    createMap('DT1', 'Rapid Spiral', 'Hatsune Miku', 'ekr-', 'Vortex', '7.77', '252 (168)', '04:02', '4.0', '10.4', 5, ['Stream', 'Deathstream']),
                    createMap('DT2', 'Zero Gravity', 'xi', 'Spectator', 'Weightless', '8.55', '234 (156)', '03:52', '3.5', '10.6', 0, ['Deathstream', 'Alt']),
                    createMap('DT3', 'Cosmic Surge', 'Camellia', 'Maitoo', 'Supernova', '8.11', '216 (144)', '04:30', '4.0', '10.2', 1, ['Jump', 'Reading']),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    createMap('FM1', 'Mirror Maze', 'Silentroom', 'Jemzuu', 'Reflection', '6.33', '182', '04:18', '4.2', '9.2', 2, ['Precision', 'Tech']),
                    createMap('FM2', 'Solar Wind', 'Silentroom', 'Hareimu', 'Corona', '6.66', '195', '04:02', '4.0', '9.4', 3, ['Stacking', 'Wiggle']),
                    createMap('FM3', 'Orbital Decay', 'Camellia', 'Taiyi', 'Perihelion', '6.99', '202', '04:12', '3.8', '9.5', 4, ['Jump', 'FingCon']),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    createMap('TB', 'Absolute Zero', 'Silentroom', 'Jemzuu & ekr-', 'Zero Point', '9.44', '292', '06:44', '4.0', '9.9', 5, ['Jump', 'Stream', 'Tech', 'Alt']),
                ],
            },
        ],
    },
    {
        id: 'finals-gf',
        label: 'Finals / Grand Finals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    createMap('NM1', 'Eternal Stratosphere', 'Silentroom', 'Jemzuu', 'Zenith', '7.00', '220', '04:22', '4.0', '9.8', 2, ['Jump', 'Alt', 'Precision']),
                    createMap('NM2', 'Void Sequence', 'Camellia', 'ekr-', 'Nullspace', '7.22', '235', '04:10', '3.8', '9.8', 3, ['Stream', 'Speed']),
                    createMap('NM3', 'Paradox Engine', 'xi', 'Spectator', 'Anomaly', '7.55', '250', '04:35', '3.5', '9.9', 4, ['Tech', 'Reading', 'Wiggle']),
                    createMap('NM4', 'Quantum Rift', 'FLOWREATING', 'Hareimu', 'Singularity', '7.77', '262', '04:05', '3.5', '9.9', 5, ['FingCon', 'Deathstream']),
                    createMap('NM5', 'Infinite Regress', 'n-buna', 'Maitoo', 'Loop', '8.00', '240', '04:48', '3.3', '10.0', 0, ['Jump', 'Alt', 'Speed']),
                    createMap('NM6', 'Absolute Reality', 'Camellia', 'Taiyi', 'Transcendence', '8.33', '275', '05:02', '3.0', '10.0', 1, ['Tech', 'Stream', 'Precision']),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    createMap('HD1', 'Phantom Horizon', 'YOASOBI', 'Bunnrei', 'Mirage', '6.66', '148', '03:55', '4.0', '9.0', 2, ['Low AR', 'Jump', 'Stacking']),
                    createMap('HD2', 'Ghost Protocol', 'Aaryn', 'Taiyi', 'Specter', '6.99', '225', '04:10', '3.5', '8.8', 3, ['Low AR', 'Reading', 'FingCon']),
                    createMap('HD3', 'Nebula Drift', 'xi', 'Xinnoh', 'Interstellar', '7.33', '198', '04:25', '3.8', '8.5', 4, ['Low AR', 'Tech', 'Wiggle']),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    createMap('HR1', 'Supernova Burst', 'Camellia', 'Hareimu', 'Hypernova', '7.77', '285', '03:35', '5.5', '10.0', 5, ['Stream', 'Speed', 'Deathstream']),
                    createMap('HR2', 'Diamond Precision', 'xi', 'Xinnoh', 'Flawless', '7.44', '215', '04:00', '5.0', '10.0', 0, ['Jump', 'Alt', 'Precision']),
                    createMap('HR3', 'Velocity Storm', 'Cash Cash', 'Nelly', 'Tempest', '7.11', '195', '04:12', '5.2', '9.9', 1, ['Alt', 'FingCon', 'Stream']),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    createMap('DT1', 'Lightspeed', 'Hatsune Miku', 'ekr-', 'Warp', '8.22', '264 (176)', '04:08', '4.0', '10.6', 2, ['Stream', 'Deathstream']),
                    createMap('DT2', 'Event Horizon', 'xi', 'Spectator', 'Singularity', '9.00', '246 (164)', '03:58', '3.5', '10.8', 3, ['Deathstream', 'Alt', 'Speed']),
                    createMap('DT3', 'Dark Matter', 'Camellia', 'Maitoo', 'Accretion', '8.55', '228 (152)', '04:36', '4.0', '10.4', 4, ['Jump', 'Reading', 'FingCon']),
                    createMap('DT4', 'Overdrive EX', 'Camellia', 'Jemzuu', 'Critical Mass', '9.44', '276 (184)', '04:05', '3.5', '10.9', 5, ['Deathstream', 'Speed', 'Alt']),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    createMap('FM1', 'Chaos Theory', 'Silentroom', 'Jemzuu', 'Entropy', '6.77', '192', '04:25', '4.2', '9.4', 0, ['Precision', 'Tech', 'Stacking']),
                    createMap('FM2', 'Fractal Bloom', 'Silentroom', 'Hareimu', 'Mandelbrot', '7.11', '205', '04:10', '4.0', '9.6', 1, ['Wiggle', 'FingCon', 'Jump']),
                    createMap('FM3', 'Entropy Rising', 'Camellia', 'Taiyi', 'Disorder', '7.44', '215', '04:20', '3.8', '9.7', 2, ['Jump', 'Stream', 'Alt']),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    createMap('TB', 'END OF TIME', 'Silentroom×Camellia', 'All-Stars Team', 'Omega', '10.00', '310', '07:30', '4.0', '10.0', 3, ['Jump', 'Stream', 'Tech', 'Alt', 'Speed', 'Precision']),
                ],
            },
        ],
    },
];

// ── DATA MASTER LENGKAP ──
const ALL_TOURNAMENTS = [
    {
        id: 1,
        name: 'osu!catch Asia-Pacific Cup 2026',
        status: 'open',
        host: { username: 'Dendy' },
        gamemode: 'osu!catch',
        max_rank: 1,
        min_rank: 500,
        start_datetime: '2026-04-11',
        end_datetime: '2026-06-20',
        caption: 'Pertempuran regional terbesar komunitas APAC.',
        rules: '1. Pemain wajib berdomisili di wilayah Asia-Pacific.\n2. Team beranggotakan 2-3 pemain.\n3. Menggunakan sistem Double Elimination.',
        prize_pool: [
            { place: 'Juara 1', prize: '$300 + Profile Badge' },
            { place: 'Juara 2', prize: '$150' },
            { place: 'Juara 3', prize: '$75' },
        ],
        players: [
            // TEAMS
            { username: 'Jemzuu', country: '🇯🇵', discord: '@Jemzuu#1234', rank: 1, team: 'Japan' },
            { username: 'Alneta', country: '🇯🇵', discord: '@Alneta#5678', rank: 5, team: 'Japan' },
            { username: 'Daikichi', country: '🇯🇵', discord: '@Daikichi#9012', rank: 12, team: 'Japan' },
            
            { username: 'ekr-', country: '🇰🇷', discord: '@ekr-#3456', rank: 3, team: 'South Korea' },
            { username: 'Spectator', country: '🇰🇷', discord: '@Spectator#7890', rank: 8, team: 'South Korea' },
            
            { username: 'Maitoo', country: '🇦🇺', discord: '@Maitoo#2345', rank: 7, team: 'Australia' },
            { username: 'Hareimu', country: '🇦🇺', discord: '@Hareimu#6789', rank: 14, team: 'Australia' },
            
            { username: 'YesMyDarknesss', country: '🇮🇩', discord: '@YesMyDarknesss#0123', rank: 18, team: 'Indonesia' },
            { username: 'Xinnoh', country: '🇮🇩', discord: '@Xinnoh#4567', rank: 22, team: 'Indonesia' },
            
            { username: 'PukPow', country: '🇵🇭', discord: '@PukPow#8901', rank: 25, team: 'Philippines' },
            { username: 'Kuya', country: '🇵🇭', discord: '@Kuya#2345', rank: 30, team: 'Philippines' },
            
            { username: 'Bunnrei', country: '🇹🇭', discord: '@Bunnrei#6789', rank: 20, team: 'Thailand' },
            { username: 'Taiyi', country: '🇹🇭', discord: '@Taiyi#0123', rank: 28, team: 'Thailand' },
            
            // SOLO PLAYERS
            { username: 'FruitKing', country: '🇸🇬', discord: '@FruitKing#4567', rank: 45, team: 'Solo' },
            { username: 'CatchMaster99', country: '🇲🇾', discord: '@CatchMaster99#8901', rank: 52, team: 'Solo' },
            { username: 'AcePlayer', country: '🇵🇦', discord: '@AcePlayer#2345', rank: 38, team: 'Solo' },
            { username: 'FlyingBird', country: '🇳🇿', discord: '@FlyingBird#6789', rank: 61, team: 'Solo' },
            { username: 'ThunderStrike', country: '🇭🇰', discord: '@ThunderStrike#0123', rank: 73, team: 'Solo' },
            { username: 'SilentAssassin', country: '🇨🇳', discord: '@SilentAssassin#4567', rank: 89, team: 'Solo' },
            { username: 'EchoVoid', country: '🇻🇳', discord: '@EchoVoid#8901', rank: 95, team: 'Solo' },
            { username: 'LunaLight', country: '🇧🇩', discord: '@LunaLight#2345', rank: 102, team: 'Solo' },
            { username: 'SolarFlare', country: '🇬🇺', discord: '@SolarFlare#6789', rank: 118, team: 'Solo' },
            { username: 'NeonGhost', country: '🇰🇭', discord: '@NeonGhost#0123', rank: 135, team: 'Solo' },
        ],
    },
    {
        id: 2,
        name: 'Catch World Championship 2026',
        status: 'ongoing',
        host: { username: 'Ascendance' },
        gamemode: 'osu!catch',
        max_rank: 1,
        min_rank: 50,
        start_datetime: '2026-03-01',
        end_datetime: '2026-05-15',
        caption: 'The ultimate battle for the gold fruit crown.',
        rules: 'Standard World Cup rules apply. Top 50 Global only.',
        prize_pool: [
            { place: 'Juara 1', prize: '$1,000 + Physical Trophy' },
            { place: 'Juara 2', prize: '$500' },
            { place: 'Juara 3', prize: '$250' },
        ],
        players: [
            // TEAMS
            { username: 'BlueRose_4', country: '🇦🇷', discord: '@BlueRose_4#1234', rank: 274951, team: 'Argentina' },
            { username: 'Nabo Loko', country: '🇦🇷', discord: '@NaboLoko#5678', rank: 263628, team: 'Argentina' },
            { username: 'PipooOSU', country: '🇦🇷', discord: '@PipooOSU#9012', rank: 284692, team: 'Argentina' },
            { username: 'teashii', country: '🇦🇷', discord: '@teashii#3456', rank: 286980, team: 'Argentina' },
            { username: 'Eio707', country: '🇦🇷', discord: '@Eio707#7890', rank: 280417, team: 'Argentina' },
            
            { username: 'PukPow', country: '🇵🇭', discord: '@PukPow#2345', rank: 279282, team: 'Asia Pacific' },
            { username: 'Bluesayonkai', country: '🇵🇭', discord: '@Bluesayonkai#6789', rank: 278318, team: 'Asia Pacific' },
            { username: 'Supulfurries', country: '🇵🇭', discord: '@Supulfurries#0123', rank: 240867, team: 'Asia Pacific' },
            { username: 'birdie', country: '🇵🇭', discord: '@birdie#4567', rank: 268101, team: 'Asia Pacific' },
            { username: 'yES-', country: '🇵🇭', discord: '@yES-#8901', rank: 259234, team: 'Asia Pacific' },
            
            { username: 'Pilot_BFPRI', country: '🇧🇩', discord: '@Pilot_BFPRI#2345', rank: 430708, team: 'Bangladesh and India' },
            { username: 'Hardcorebrain27', country: '🇮🇳', discord: '@Hardcorebrain27#6789', rank: 363743, team: 'Bangladesh and India' },
            { username: '_rub', country: '🇮🇳', discord: '@_rub#0123', rank: 385313, team: 'Bangladesh and India' },
            
            { username: 'applearon', country: '🇨🇦', discord: '@applearon#4567', rank: 299473, team: 'Canada A' },
            { username: 'aikinoou', country: '🇨🇦', discord: '@aikinoou#8901', rank: 267593, team: 'Canada A' },
            { username: 'Ronnymar', country: '🇨🇦', discord: '@Ronnymar#2345', rank: 268108, team: 'Canada A' },
            { username: 'Data Bytten', country: '🇨🇦', discord: '@DataBytten#6789', rank: 258977, team: 'Canada A' },
            { username: 'ImpureConnects', country: '🇨🇦', discord: '@ImpureConnects#0123', rank: 268708, team: 'Canada A' },
            
            { username: 'DimplesRMe', country: '🇨🇦', discord: '@DimplesRMe#4567', rank: 326402, team: 'Canada B' },
            { username: 'Myrap', country: '🇨🇦', discord: '@Myrap#8901', rank: 326081, team: 'Canada B' },
            { username: 'SuperiorFish', country: '🇨🇦', discord: '@SuperiorFish#2345', rank: 316999, team: 'Canada B' },
            { username: 'dino cant fc', country: '🇨🇦', discord: '@dinocantfc#6789', rank: 368017, team: 'Canada B' },
            { username: 'AlexiVader', country: '🇨🇦', discord: '@AlexiVader#0123', rank: 333046, team: 'Canada B' },
            
            { username: 'Monke Eater', country: '🇨🇦', discord: '@MonkeEater#4567', rank: 290619, team: 'Canada C' },
            { username: 'grapesofwrath', country: '🇨🇦', discord: '@grapesofwrath#8901', rank: 578169, team: 'Canada C' },
            { username: 'Shawwfrost_old_3', country: '🇨🇦', discord: '@Shawwfrost#2345', rank: 461762, team: 'Canada C' },
            { username: 'Showermat', country: '🇨🇦', discord: '@Showermat#6789', rank: 284345, team: 'Canada C' },
            
            { username: 'ManuAoK', country: '🇨🇱', discord: '@ManuAoK#0123', rank: 254825, team: 'Chile' },
            { username: 'Kioshinxs', country: '🇨🇱', discord: '@Kioshinxs#4567', rank: 255172, team: 'Chile' },
            { username: 'Atendiendo', country: '🇨🇱', discord: '@Atendiendo#8901', rank: 259149, team: 'Chile' },
            { username: 'Unitas', country: '🇨🇱', discord: '@Unitas#2345', rank: 258515, team: 'Chile' },
            
            { username: 'My Angel Kazuha', country: '🇨🇳', discord: '@MyAngelKazuha#6789', rank: 254773, team: 'China A' },
            { username: 'Salery', country: '🇨🇳', discord: '@Salery#0123', rank: 279794, team: 'China A' },
            { username: 'Zeguqi', country: '🇨🇳', discord: '@Zeguqi#4567', rank: 313676, team: 'China A' },
            { username: 'winter_bug', country: '🇨🇳', discord: '@winter_bug#8901', rank: 251946, team: 'China A' },
            
            { username: 'potatoxu', country: '🇨🇳', discord: '@potatoxu#2345', rank: 283402, team: 'China B' },
            { username: 'Sakuraxia', country: '🇨🇳', discord: '@Sakuraxia#6789', rank: 326048, team: 'China B' },
            { username: 'NanShe22', country: '🇨🇳', discord: '@NanShe22#0123', rank: 557931, team: 'China B' },
            { username: 'Toufu_qvq', country: '🇨🇳', discord: '@Toufu_qvq#4567', rank: 271033, team: 'China B' },
            
            { username: 'HaruUjara', country: '🇪🇪', discord: '@HaruUjara#8901', rank: 378012, team: 'Estonia' },
            { username: 'Azulfeat', country: '🇪🇪', discord: '@Azulfeat#2345', rank: 620166, team: 'Estonia' },
            
            { username: 'DeadKing', country: '🇷🇺', discord: '@DeadKing#6789', rank: 348466, team: 'Eurasia' },
            { username: 'Xeereoram', country: '🇰🇿', discord: '@Xeereoram#0123', rank: 802680, team: 'Eurasia' },
            
            { username: 'danielhofmak', country: '🇪🇪', discord: '@danielhofmak#4567', rank: 263851, team: 'European Triad' },
            { username: 'AlcohoBibed', country: '🇱🇹', discord: '@AlcohoBibed#8901', rank: 356830, team: 'European Triad' },
            { username: 'AlienFBK', country: '🇩🇰', discord: '@AlienFBK#2345', rank: 412013, team: 'European Triad' },
            
            { username: 'girthe', country: '🇫🇷', discord: '@girthe#6789', rank: 278903, team: 'France A' },
            { username: 'BloodLantern', country: '🇫🇷', discord: '@BloodLantern#0123', rank: 251150, team: 'France A' },
            
            { username: 'Azyef', country: '🇫🇷', discord: '@Azyef#4567', rank: 309632, team: 'France B' },
            { username: 'Bad Seven', country: '🇫🇷', discord: '@BadSeven#8901', rank: 274444, team: 'France B' },
            
            // SOLO PLAYERS
            { username: 'crisfiann', country: '🇺🇸', discord: '@crisfiann#2345', rank: 346350, team: 'Solo' },
            { username: '[Siek]', country: '🇺🇸', discord: '@Siek#6789', rank: 299458, team: 'Solo' },
            { username: 'AbnormalStar', country: '🇺🇸', discord: '@AbnormalStar#0123', rank: 518245, team: 'Solo' },
            { username: 'adrianlzaer', country: '🇺🇸', discord: '@adrianlzaer#4567', rank: 1040435, team: 'Solo' },
            { username: 'ahleeceeah', country: '🇺🇸', discord: '@ahleeceeah#8901', rank: 294078, team: 'Solo' },
            { username: 'Arch1010', country: '🇺🇸', discord: '@Arch1010#2345', rank: 451141, team: 'Solo' },
            { username: 'captainblinker', country: '🇺🇸', discord: '@captainblinker#6789', rank: 395496, team: 'Solo' },
            { username: 'DA_Jinx', country: '🇺🇸', discord: '@DA_Jinx#0123', rank: 363945, team: 'Solo' },
            { username: 'Estebean', country: '🇺🇸', discord: '@Estebean#4567', rank: 263857, team: 'Solo' },
            { username: 'goten45r', country: '🇺🇸', discord: '@goten45r#8901', rank: 280470, team: 'Solo' },
            { username: 'iyokk', country: '🇺🇸', discord: '@iyokk#2345', rank: 320452, team: 'Solo' },
            { username: 'Kalawoo', country: '🇺🇸', discord: '@Kalawoo#6789', rank: 263129, team: 'Solo' },
            { username: 'Lordheadass7', country: '🇺🇸', discord: '@Lordheadass7#0123', rank: 333868, team: 'Solo' },
            { username: 'Lunoxia', country: '🇺🇸', discord: '@Lunoxia#4567', rank: 321333, team: 'Solo' },
            { username: 'Megurdaa', country: '🇺🇸', discord: '@Megurdaa#8901', rank: 418950, team: 'Solo' },
            { username: 'prongle', country: '🇺🇸', discord: '@prongle#2345', rank: 465655, team: 'Solo' },
            { username: 'ream', country: '🇺🇸', discord: '@ream#6789', rank: 338620, team: 'Solo' },
            { username: 'Revive Chaos', country: '🇺🇸', discord: '@ReviveChaos#0123', rank: 322462, team: 'Solo' },
            { username: 'satyen7', country: '🇺🇸', discord: '@satyen7#4567', rank: 268167, team: 'Solo' },
            { username: 'screwyougoose', country: '🇺🇸', discord: '@screwyougoose#8901', rank: 279313, team: 'Solo' },
            { username: 'sedopedona', country: '🇺🇸', discord: '@sedopedona#2345', rank: 461396, team: 'Solo' },
            { username: 'TexasRed03', country: '🇺🇸', discord: '@TexasRed03#6789', rank: 291995, team: 'Solo' },
            { username: 'Thang Ngot', country: '🇺🇸', discord: '@ThangNgot#0123', rank: 388329, team: 'Solo' },
            { username: 'UnknownlsAGamer', country: '🇺🇸', discord: '@UnknownlsAGamer#4567', rank: 434727, team: 'Solo' },
            { username: 'Zhinin', country: '🇺🇸', discord: '@Zhinin#8901', rank: 338544, team: 'Solo' },
            
            { username: '-Hina Sorasaki-', country: '🇻🇳', discord: '@HinaSorasaki#2345', rank: 254018, team: 'Solo' },
            { username: 'AmrYAYA', country: '🇻🇳', discord: '@AmrYAYA#6789', rank: 332944, team: 'Solo' },
            { username: 'Ayoko23', country: '🇻🇳', discord: '@Ayoko23#0123', rank: 446566, team: 'Solo' },
            { username: 'Ayotelofi', country: '🇻🇳', discord: '@Ayotelofi#4567', rank: 365065, team: 'Solo' },
            { username: 'bw_sen', country: '🇻🇳', discord: '@bw_sen#8901', rank: 563792, team: 'Solo' },
            { username: 'CryoPie', country: '🇻🇳', discord: '@CryoPie#2345', rank: 427727, team: 'Solo' },
            { username: 'darinyss', country: '🇻🇳', discord: '@darinyss#6789', rank: 258106, team: 'Solo' },
            { username: 'Don-quixote', country: '🇻🇳', discord: '@Donquixote#0123', rank: 405411, team: 'Solo' },
            { username: 'GH_GH', country: '🇻🇳', discord: '@GH_GH#4567', rank: 271587, team: 'Solo' },
            { username: 'hdao', country: '🇻🇳', discord: '@hdao#8901', rank: 290049, team: 'Solo' },
            { username: 'Hikaru_Senpai', country: '🇻🇳', discord: '@HikaruSenpai#2345', rank: 252352, team: 'Solo' },
            { username: 'honey69', country: '🇻🇳', discord: '@honey69#6789', rank: 257916, team: 'Solo' },
            { username: 'jetpackvn', country: '🇻🇳', discord: '@jetpackvn#0123', rank: 401477, team: 'Solo' },
            { username: 'LongSuperLol', country: '🇻🇳', discord: '@LongSuperLol#4567', rank: 344354, team: 'Solo' },
            { username: 'Manhhhhhhh', country: '🇻🇳', discord: '@Manhhhhhhh#8901', rank: 457666, team: 'Solo' },
            { username: 'My Angel Hikari', country: '🇻🇳', discord: '@MyAngelHikari#2345', rank: 322962, team: 'Solo' },
            { username: 'Nassaki', country: '🇻🇳', discord: '@Nassaki#6789', rank: 270110, team: 'Solo' },
            { username: 'ndm5955', country: '🇻🇳', discord: '@ndm5955#0123', rank: 433814, team: 'Solo' },
            { username: 'Nocos', country: '🇻🇳', discord: '@Nocos#4567', rank: 404304, team: 'Solo' },
            { username: 'Not Susan', country: '🇻🇳', discord: '@NotSusan#8901', rank: 391447, team: 'Solo' },
            { username: 'sharkviet', country: '🇻🇳', discord: '@sharkviet#2345', rank: 301500, team: 'Solo' },
            
            { username: 'MatoTM', country: '🇲🇬', discord: '@MatoTM#6789', rank: 305904, team: 'Solo' },
            { username: 'linesqtz', country: '🇲🇬', discord: '@linesqtz#0123', rank: 335554, team: 'Solo' },
            { username: 'TBT_Breadby', country: '🇲🇬', discord: '@TBT_Breadby#4567', rank: 283466, team: 'Solo' },
            { username: 'Harmfull', country: '🇨🇦', discord: '@Harmfull#8901', rank: 275187, team: 'Solo' },
            { username: 'MWofDethe', country: '🇨🇦', discord: '@MWofDethe#2345', rank: 437331, team: 'Solo' },
            
            { username: 'adadadadadogg', country: '🇺🇦', discord: '@adadadadadogg#6789', rank: 447336, team: 'Solo' },
            { username: 'zetrickk', country: '🇺🇦', discord: '@zetrickk#0123', rank: 283282, team: 'Solo' },
            { username: 'SPOOKYY_', country: '🇺🇸', discord: '@SPOOKYY_#4567', rank: 356750, team: 'Solo' },
            { username: 'Vi517', country: '🇺🇸', discord: '@Vi517#8901', rank: 519832, team: 'Solo' },
            { username: 'Hioimao123', country: '🇻🇳', discord: '@Hioimao123#2345', rank: 290125, team: 'Solo' },
            { username: 'lollmc', country: '🇻🇳', discord: '@lollmc#6789', rank: 452586, team: 'Solo' },
            { username: 'iNexus12', country: '🇦🇷', discord: '@iNexus12#0123', rank: 302013, team: 'Solo' },
            { username: 'olivermb21', country: '🇩🇰', discord: '@olivermb21#4567', rank: 660222, team: 'Solo' },
            { username: 'himirami', country: '🇫🇮', discord: '@himirami#8901', rank: 588227, team: 'Solo' },
            { username: 'Boubakia', country: '🇫🇷', discord: '@Boubakia#2345', rank: 374760, team: 'Solo' },
            { username: 'NimezidaXXL', country: '🇰🇿', discord: '@NimezidaXXL#6789', rank: 335974, team: 'Solo' },
            { username: 'Vaihet', country: '🇲🇽', discord: '@Vaihet#0123', rank: 252893, team: 'Solo' },
            { username: 'rielo', country: '🇵🇭', discord: '@rielo#4567', rank: 388997, team: 'Solo' },
            { username: 'Hailey_b', country: '🇪🇸', discord: '@Hailey_b#8901', rank: 512098, team: 'Solo' },
            { username: 'smurfchads', country: '🇹🇷', discord: '@smurfchads#2345', rank: 264674, team: 'Solo' },
        ],
    },
    {
        id: 3,
        name: 'Rookie Catch Festival 2025',
        status: 'ended',
        host: { username: 'Wesley' },
        gamemode: 'osu!catch',
        max_rank: 5000,
        min_rank: 99999,
        start_datetime: '2025-12-01',
        end_datetime: '2026-01-15',
        caption: 'Festival santai untuk pemain baru komunitas catch.',
        rules: 'Khusus rank 5000 ke bawah. Dilarang smurfing.',
        prize_pool: [
            { place: 'Juara 1', prize: '4 Months Supporter Tag' },
            { place: 'Juara 2', prize: '2 Months Supporter Tag' },
            { place: 'Juara 3', prize: '1 Month Supporter Tag' },
        ],
        winners: [
            { place: 'Juara 1', username: 'Exgon Junior', country: '🇰🇷' },
            { place: 'Juara 2', username: 'IndoPride_01', country: '🇮🇩' },
            { place: 'Juara 3', username: 'FruitMaster', country: '🇺🇸' },
        ],
        players: [
            // TEAMS
            { username: 'Team Alpha Lead', country: '🇮🇩', rank: 5000, team: 'Alpha Squad' },
            { username: 'Team Alpha Mid', country: '🇮🇩', rank: 5500, team: 'Alpha Squad' },
            { username: 'Team Alpha Support', country: '🇮🇩', rank: 6000, team: 'Alpha Squad' },
            
            { username: 'Team Beta Captain', country: '🇵🇭', rank: 5100, team: 'Beta Team' },
            { username: 'Team Beta Member', country: '🇵🇭', rank: 5400, team: 'Beta Team' },
            
            { username: 'Team Gamma Lead', country: '🇹🇭', rank: 5200, team: 'Gamma Force' },
            { username: 'Team Gamma Support', country: '🇹🇭', rank: 5700, team: 'Gamma Force' },
            { username: 'Team Gamma Sub', country: '🇹🇭', rank: 6100, team: 'Gamma Force' },
            
            { username: 'Team Delta A', country: '🇻🇳', rank: 5300, team: 'Delta Crew' },
            { username: 'Team Delta B', country: '🇻🇳', rank: 5600, team: 'Delta Crew' },
            
            // SOLO PLAYERS
            { username: 'Exgon Junior', country: '🇰🇷', rank: 5200, team: 'Solo' },
            { username: 'IndoPride_01', country: '🇮🇩', rank: 6100, team: 'Solo' },
            { username: 'FruitMaster', country: '🇺🇸', rank: 6500, team: 'Solo' },
            { username: 'CatchNinja01', country: '🇯🇵', rank: 5800, team: 'Solo' },
            { username: 'FlutterWing', country: '🇲🇾', rank: 5900, team: 'Solo' },
            { username: 'StarLight88', country: '🇸🇬', rank: 6200, team: 'Solo' },
            { username: 'CloudDreamer', country: '🇧🇩', rank: 6300, team: 'Solo' },
            { username: 'SkyWalker42', country: '🇲🇿', rank: 6400, team: 'Solo' },
            { username: 'FireBlaze', country: '🇳🇿', rank: 6600, team: 'Solo' },
            { username: 'IceStorm', country: '🇦🇺', rank: 6700, team: 'Solo' },
            { username: 'ThunderHawk', country: '🇭🇰', rank: 6800, team: 'Solo' },
            { username: 'SilentMoon', country: '🇨🇳', rank: 6900, team: 'Solo' },
            { username: 'EchoKnight', country: '🇰🇭', rank: 7000, team: 'Solo' },
            { username: 'VoidShadow', country: '🇱🇦', rank: 7100, team: 'Solo' },
            { username: 'LunaStrike', country: '🇴🇳', rank: 7200, team: 'Solo' },
        ],
    },
];

const DUMMY_LOBBIES = [
    {
        id: 101,
        name: 'Grand Final',
        status: 'finished',
        scheduled_at: '2026-05-16T20:00:00Z',
        score: { blue: 4, red: 2 },
        team_one: { name: 'Indo Pride' },
        team_two: { name: 'Sentinels' },
        referees: [{ name: 'Rudy' }],
        streamer: 'Bang Alex',
        caster: 'Pak Pulung',
    },
];

export default function Show({ tournament, lobbies = DUMMY_LOBBIES }: any) {
    const t = useMemo(() => {
        if (tournament?.id) return tournament;
        const idFromPath = window.location.pathname.split('/').pop();
        return (
            ALL_TOURNAMENTS.find((item) => item.id.toString() === idFromPath) ||
            ALL_TOURNAMENTS[0]
        );
    }, [tournament]);

    const [activeTab, setActiveTab] = useState('detail');
    const [showRegistration, setShowRegistration] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null);

    const tabs = [
        { id: 'detail', label: 'Detail', icon: <FileText size={14} /> },
        { id: 'schedule', label: 'Schedule', icon: <Calendar size={14} /> },
        { id: 'rules', label: 'Rules', icon: <ShieldCheck size={14} /> },
        { id: 'mappool', label: 'Mappool', icon: <List size={14} /> },
        { id: 'bracket', label: 'Bracket', icon: <Zap size={14} /> },
        { id: 'players', label: 'Players/Teams', icon: <Users size={14} /> },
        { id: 'stats', label: 'Statistics', icon: <BarChart3 size={14} /> },
        { id: 'qualifiers', label: 'Qualifiers', icon: <Trophy size={14} /> },
        { id: 'registration', label: 'Registration', icon: <LogIn size={14} /> },
        { id: 'comments', label: 'Comments', icon: <MessageSquare size={14} /> },
        { id: 'resources', label: 'Resources', icon: <LinkIcon size={14} /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-900">
            <Head title={`${t.name} - Details`} />

            {/* HERO */}
            <header className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-12 pb-20">
                <div className="mx-auto max-w-6xl px-6 text-left">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-600 dark:text-slate-400 uppercase transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        <ArrowLeft size={14} /> Back to Index
                    </Link>
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase ring-1 ring-indigo-200 dark:ring-indigo-800">
                                    {t.gamemode}
                                </span>
                                <span
                                    className={cn(
                                        'px-3 py-1 text-xs font-semibold uppercase ring-1 rounded-lg',
                                        t.status === 'open'
                                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-emerald-200 dark:ring-emerald-800'
                                            : t.status === 'ongoing'
                                              ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-indigo-200 dark:ring-indigo-800'
                                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ring-slate-200 dark:ring-slate-700',
                                    )}
                                >
                                    {t.status === 'ended'
                                        ? 'FINISHED'
                                        : t.status}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                                {t.name}
                            </h1>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 italic">
                                "{t.caption}"
                            </p>
                        </div>
                        <div className="flex gap-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                            <StatWidget
                                label="Rank Limit"
                                value={`#${t.max_rank}-${t.min_rank}`}
                                icon={<Gamepad2 size={14} />}
                            />
                            <div className="w-px bg-slate-200 dark:bg-slate-800" />
                            <StatWidget
                                label="Start Date"
                                value={t.start_datetime}
                                icon={<Calendar size={14} />}
                            />
                            <div className="w-px bg-slate-200 dark:bg-slate-800" />
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/mappack/tournament.zip';
                                    link.download = 'mappack.zip';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 font-semibold text-xs uppercase transition-all whitespace-nowrap rounded-lg"
                            >
                                <Download size={14} />
                                Mappack
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6">
                {/* TABS NAVIGATION */}
                <div className="relative -mt-7 mb-12 flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-2 border rounded-lg px-5 py-2.5 text-xs font-semibold transition-all',
                                activeTab === tab.id
                                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400',
                            )}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        {activeTab === 'detail' && (
                            <div className="space-y-8">
                                {/* TOURNAMENT BANNER/COVER */}
                                <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg">
                                    <div className="absolute inset-0 opacity-10 bg-slate-800" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="relative h-full flex flex-col justify-end p-8">
                                        <h2 className="text-3xl font-bold text-white mb-2">{t.name}</h2>
                                        <p className="text-white/80 text-sm">{t.caption}</p>
                                    </div>
                                </div>

                                {/* TOURNAMENT INFO GRID */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {/* Status */}
                                    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-6">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                'w-3 h-3 rounded-full',
                                                t.status === 'open' ? 'bg-emerald-500' :
                                                t.status === 'ongoing' ? 'bg-indigo-500' :
                                                'bg-slate-400'
                                            )} />
                                            <span className={cn(
                                                'font-bold text-sm',
                                                t.status === 'open' ? 'text-emerald-600 dark:text-emerald-400' :
                                                t.status === 'ongoing' ? 'text-indigo-600 dark:text-indigo-400' :
                                                'text-slate-600 dark:text-slate-400'
                                            )}>
                                                {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gamemode */}
                                    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-6">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Gamemode</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{t.gamemode}</p>
                                    </div>

                                    {/* Date Range */}
                                    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-6">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Start Date</p>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{t.start_datetime}</p>
                                    </div>

                                    {/* Organizer */}
                                    <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-6">
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Organizer</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{t.host.username}</p>
                                    </div>
                                </div>

                                {/* RULES SECTION */}
                                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-8">
                                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-6 flex items-center gap-2">
                                        <ShieldCheck size={20} />
                                        Tournament Regulations
                                    </h3>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-line">
                                            {t.rules}
                                        </p>
                                    </div>
                                </div>

                                {/* WINNERS SECTION (Only if ended) */}
                                {t.status === 'ended' && t.winners && (
                                    <div>
                                        <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 uppercase mb-6 flex items-center gap-2">
                                            <Crown size={20} />
                                            Tournament Hall of Fame
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            {t.winners.map((w: any, i: any) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        'relative overflow-hidden border rounded-lg p-8 text-center transition-all',
                                                        i === 0
                                                            ? 'border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 ring-2 ring-amber-300 dark:ring-amber-700'
                                                            : i === 1
                                                            ? 'border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900'
                                                            : 'border-orange-300 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20',
                                                    )}
                                                >
                                                    {i === 0 && (
                                                        <div className="absolute -top-3 -right-3">
                                                            <div className="relative">
                                                                <Crown className="h-12 w-12 text-amber-400 drop-shadow-lg" fill="currentColor" />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="mb-4">
                                                        <p className={cn(
                                                            'text-xs font-bold uppercase tracking-wider mb-3',
                                                            i === 0 ? 'text-amber-600 dark:text-amber-400' :
                                                            i === 1 ? 'text-slate-600 dark:text-slate-400' :
                                                            'text-orange-600 dark:text-orange-400'
                                                        )}>
                                                            {i === 0 ? '🥇 1st Place' : i === 1 ? '🥈 2nd Place' : '🥉 3rd Place'}
                                                        </p>
                                                        <p className={cn(
                                                            'text-xs font-semibold mb-2',
                                                            i === 0 ? 'text-amber-700 dark:text-amber-300' :
                                                            i === 1 ? 'text-slate-700 dark:text-slate-300' :
                                                            'text-orange-700 dark:text-orange-300'
                                                        )}>
                                                            {w.place}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2 mb-2">
                                                        <span className="text-2xl">{w.country}</span>
                                                    </div>
                                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                                        {w.username}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PRIZE POOL SECTION */}
                                <div>
                                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-6 flex items-center gap-2">
                                        <Trophy size={20} />
                                        Prize Pool Distribution
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        {t.prize_pool?.map((p: any, i: any) => (
                                            <div
                                                key={i}
                                                className="relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-8 text-center transition-all hover:shadow-lg group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative">
                                                    <Trophy
                                                        className={cn(
                                                            'mx-auto mb-4',
                                                            i === 0
                                                                ? 'text-amber-500'
                                                                : i === 1
                                                                  ? 'text-slate-400'
                                                                  : 'text-orange-500',
                                                        )}
                                                        size={32}
                                                    />
                                                    <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-3">
                                                        {p.place}
                                                    </p>
                                                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                                                        {p.prize}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'rules' && (
                            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg">
                                <h3 className="mb-6 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                    Tournament Regulations
                                </h3>
                                <p className="text-sm leading-relaxed font-medium whitespace-pre-line text-slate-600 dark:text-slate-400">
                                    {t.rules}
                                </p>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="space-y-6">
                                <h3 className="px-2 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                    Matches & Results
                                </h3>
                                {lobbies.map((l: any) => (
                                    <MatchCard key={l.id} lobby={l} />
                                ))}
                            </div>
                        )}

                        {activeTab === 'players' && (() => {
                            if (!t.players || t.players.length === 0) {
                                return (
                                    <div className="p-12 text-center">
                                        <p className="text-sm text-stone-600 italic">Teams and players not finalized yet.</p>
                                    </div>
                                );
                            }

                            const teams = t.players.reduce((acc: any, p: any) => {
                                if (p.team && p.team !== 'Solo') {
                                    if (!acc[p.team]) acc[p.team] = [];
                                    acc[p.team].push(p);
                                }
                                return acc;
                            }, {});

                            const soloPlayers = t.players.filter((p: any) => !p.team || p.team === 'Solo');
                            const hasTeams = Object.keys(teams).length > 0;
                            const hasSoloPlayers = soloPlayers.length > 0;

                            return (
                                <div className="space-y-12">
                                    <PlayersSearchFilter 
                                        players={t.players} 
                                        teams={Object.values(teams)} 
                                    />
                                    {hasTeams && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="flex items-center gap-2 px-2 text-sm font-black text-white uppercase tracking-widest">
                                                    <Users2 size={16} className="text-indigo-500" />
                                                    Team Listing
                                                </h3>
                                                <p className="px-2 mt-1 text-xs text-slate-400">
                                                    {Object.keys(teams).length} TEAMS
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                {Object.entries(teams).map(([teamName, players]: any) => (
                                                    <div key={teamName} className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-4 hover:border-indigo-500/60 transition-all">
                                                        <h4 className="text-sm font-black text-white mb-4 uppercase tracking-wide">
                                                            🏁 {teamName}
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {players.map((p: any, idx: any) => (
                                                                <div key={idx} className="flex items-center justify-between bg-slate-900/40 p-2 rounded">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs">{p.country}</span>
                                                                        <div className="flex-1">
                                                                            <p className="text-xs font-bold text-slate-200">{p.username}</p>
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-[10px] font-black text-slate-500">#{p.rank}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {hasSoloPlayers && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="flex items-center gap-2 px-2 text-sm font-black text-white uppercase tracking-widest">
                                                    <Users size={16} className="text-indigo-500" />
                                                    Individual Players
                                                </h3>
                                                <p className="px-2 mt-1 text-xs text-slate-400">
                                                    {soloPlayers.length} PLAYERS
                                                </p>
                                            </div>

                                            <div className="overflow-hidden border border-stone-800 bg-stone-900/20 rounded-lg">
                                                <table className="w-full text-left">
                                                    <thead className="border-b border-stone-800 bg-stone-900/50">
                                                        <tr>
                                                            <th className="px-6 py-4 text-[9px] font-black text-stone-500 uppercase">
                                                                Flag
                                                            </th>
                                                            <th className="px-6 py-4 text-[9px] font-black text-stone-500 uppercase">
                                                                Country
                                                            </th>
                                                            <th className="px-6 py-4 text-[9px] font-black text-stone-500 uppercase">
                                                                Username
                                                            </th>
                                                            <th className="px-6 py-4 text-[9px] font-black text-stone-500 uppercase">
                                                                Discord ID
                                                            </th>
                                                            <th className="px-6 py-4 text-right text-[9px] font-black text-stone-500 uppercase">
                                                                Rank OSU
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-stone-800/50">
                                                        {soloPlayers.map((p: any, i: any) => {
                                                            const countryName = {
                                                                '🇸🇬': 'Singapore',
                                                                '🇲🇾': 'Malaysia',
                                                                '🇵🇦': 'Panama',
                                                                '🇳🇿': 'New Zealand',
                                                                '🇭🇰': 'Hong Kong',
                                                                '🇨🇳': 'China',
                                                                '🇻🇳': 'Vietnam',
                                                                '🇧🇩': 'Bangladesh',
                                                                '🇬🇺': 'Guam',
                                                                '🇰🇭': 'Cambodia',
                                                                '🇯🇵': 'Japan',
                                                                '🇰🇷': 'South Korea',
                                                                '🇦🇺': 'Australia',
                                                                '🇮🇩': 'Indonesia',
                                                                '🇵🇭': 'Philippines',
                                                                '🇹🇭': 'Thailand',
                                                            } as any;
                                                            return (
                                                                <tr key={i} className="hover:bg-stone-800/20">
                                                                    <td className="px-6 py-4 text-xl">{p.country}</td>
                                                                    <td className="px-6 py-4 text-sm text-stone-400">{countryName[p.country] || 'Unknown'}</td>
                                                                    <td className="px-6 py-4">
                                                                        <p className="text-sm font-black text-stone-200">{p.username}</p>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-stone-400">{p.discord}</td>
                                                                    <td className="px-6 py-4 text-right text-xs font-black text-stone-500">
                                                                        #{p.rank}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {activeTab === 'stats' && (
                            <div className="space-y-6">
                                <h3 className="px-2 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                    Tournament Statistics by Round
                                </h3>
                                
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <StatsCard 
                                        round="Qualifiers"
                                        stat1={{ label: "Participants", value: "..." }}
                                        stat2={{ label: "Matches Played", value: "..." }}
                                        stat3={{ label: "Avg Score", value: "..." }}
                                        accentColor="bg-blue-500/10 border-blue-500/30"
                                    />
                                    <StatsCard 
                                        round="Round of 16 (Ro16)"
                                        stat1={{ label: "Teams Remaining", value: "..." }}
                                        stat2={{ label: "Matches Played", value: "..." }}
                                        stat3={{ label: "Avg Score", value: "..." }}
                                        accentColor="bg-purple-500/10 border-purple-500/30"
                                    />
                                    <StatsCard 
                                        round="Quarterfinals (Ro8)"
                                        stat1={{ label: "Teams Remaining", value: "..." }}
                                        stat2={{ label: "Matches Played", value: "..." }}
                                        stat3={{ label: "Avg Score", value: "..." }}
                                        accentColor="bg-cyan-500/10 border-cyan-500/30"
                                    />
                                    <StatsCard 
                                        round="Semifinals"
                                        stat1={{ label: "Teams Remaining", value: "..." }}
                                        stat2={{ label: "Matches Played", value: "..." }}
                                        stat3={{ label: "Avg Score", value: "..." }}
                                        accentColor="bg-pink-500/10 border-pink-500/30"
                                    />
                                    <StatsCard 
                                        round="Grand Final"
                                        stat1={{ label: "Teams", value: "..." }}
                                        stat2={{ label: "Winner", value: "..." }}
                                        stat3={{ label: "Final Score", value: "..." }}
                                        accentColor="bg-yellow-500/10 border-yellow-500/30"
                                    />
                                    <StatsCard 
                                        round="3rd Place Playoff"
                                        stat1={{ label: "Teams", value: "..." }}
                                        stat2={{ label: "Winner", value: "..." }}
                                        stat3={{ label: "Final Score", value: "..." }}
                                        accentColor="bg-orange-500/10 border-orange-500/30"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'mappool' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="px-2 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                        Tournament Mappools
                                    </h3>
                                    <p className="px-2 mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                        Expected beatmaps for each tournament round
                                    </p>
                                </div>

                                {TOURNAMENT_STAGES.map((stage) => (
                                    <div key={stage.id} className="space-y-4">
                                        <div className="px-2 border-l-4 border-l-indigo-600 dark:border-l-indigo-500">
                                            <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                                                {stage.label}
                                            </h4>
                                        </div>

                                        {stage.groups.map((group) => {
                                            const cfg = MOD_CONFIG[group.mod];
                                            return (
                                                <section key={group.mod} className="space-y-3">
                                                    <div className="flex items-center gap-3 px-2">
                                                        <span
                                                            className={cn(
                                                                'px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase',
                                                                cfg.bg,
                                                            )}
                                                        >
                                                            {cfg.label}
                                                        </span>
                                                        <div className="h-px flex-1 bg-stone-800" />
                                                        <span className="text-[10px] font-black text-stone-500">
                                                            {group.maps.length} {group.maps.length === 1 ? 'map' : 'maps'}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                        {group.maps.map((map) => (
                                                            <div
                                                                key={map.id}
                                                                onClick={() => setSelectedMap(map)}
                                                                className="cursor-pointer"
                                                            >
                                                                <MapCard map={map} cfg={cfg} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            );
                                        })}
                                    </div>
                                ))}

                                <div className="border border-stone-800 bg-stone-900/30 p-4 text-sm text-stone-400">
                                    <p className="font-semibold text-stone-300 mb-2">Abbreviations:</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[12px]">
                                        <span><strong>NM</strong> = No Mod</span>
                                        <span><strong>HD</strong> = Hidden</span>
                                        <span><strong>HR</strong> = Hard Rock</span>
                                        <span><strong>DT</strong> = Double Time</span>
                                        <span><strong>FM</strong> = Free Mod</span>
                                        <span><strong>TB</strong> = Tiebreaker</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bracket' && (
                            <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 rounded-lg p-20 text-center">
                                <Zap
                                    className="mx-auto mb-4 text-slate-400 dark:text-slate-600"
                                    size={48}
                                />
                                <p className="text-slate-600 dark:text-slate-400 italic">
                                    Bracket is coming soon! Integration with Challonge or similar bracket manager.
                                </p>
                            </div>
                        )}

                        {activeTab === 'qualifiers' && (
                            <div className="space-y-6">
                                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg">
                                    <h3 className="mb-6 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                        Solo Qualifiers
                                    </h3>
                                    <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-12 text-center rounded">
                                        <Trophy className="mx-auto mb-4 text-slate-400 dark:text-slate-600" size={40} />
                                        <p className="text-slate-600 dark:text-slate-400 italic">
                                            Solo qualifier information will be available soon.
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg">
                                    <h3 className="mb-6 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                                        Team Qualifiers
                                    </h3>
                                    <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-12 text-center rounded">
                                        <Users2 className="mx-auto mb-4 text-slate-400 dark:text-slate-600" size={40} />
                                        <p className="text-slate-600 dark:text-slate-400 italic">
                                            Team qualifier schedules and information coming soon.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'registration' && (
                            <div className="space-y-6">
                                <div className="border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-8">
                                    <h3 className="mb-4 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                                        Registration Status
                                    </h3>
                                    <div className="border border-emerald-200 dark:border-emerald-800 bg-emerald-100 dark:bg-emerald-900/30 p-4">
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                            ✓ Registration is currently open for this tournament
                                        </p>
                                    </div>
                                </div>

                                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
                                    <h3 className="mb-6 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                        How to Register
                                    </h3>
                                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                                        <p>1. Ensure your osu! rank is within the required range.</p>
                                        <p>2. Click the "Register Now" button below.</p>
                                        <p>3. Form or join a team if team registration is required.</p>
                                        <p>4. Await confirmation from tournament organizers.</p>
                                    </div>
                                    <button
                                        onClick={() => setShowRegistration(true)}
                                        className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'comments' && (
                            <CommentsSection 
                                tournament={t} 
                                user={null}
                                comments={t.comments || []} 
                            />
                        )}

                        {activeTab === 'resources' && (
                            <div className="space-y-6">
                                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 rounded-lg">
                                    <h3 className="mb-6 text-xs font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                                        External Links & Community
                                    </h3>
                                    <div className="grid gap-3">
                                        <ResourceLink icon={<MessageSquare size={16} />} label="Discord Community" url="#" />
                                        <ResourceLink icon={<Tv size={16} />} label="Twitch Livestream" url="#" />
                                        <ResourceLink icon={<Youtube size={16} />} label="Match VODs" url="#" />
                                        <ResourceLink icon={<Radio size={16} />} label="Forum Discussion" url="#" />
                                    </div>
                                </div>

                                <div className="border border-stone-800 bg-stone-900/20 p-8">
                                    <h3 className="mb-6 text-[10px] font-black tracking-[0.2em] text-pink-500 uppercase">
                                        Important Documents
                                    </h3>
                                    <div className="space-y-3">
                                        <DocumentLink icon={<FileText size={16} />} label="Pre-tournament Forum Post" />
                                        <DocumentLink icon={<HelpCircle size={16} />} label="FAQ" />
                                        <DocumentLink icon={<ShieldCheck size={16} />} label="Anti-Cheat Policy" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <aside className="space-y-8 lg:col-span-4">
                        {/* HOST INFO */}
                        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
                            <h4 className="mb-6 text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                                Organizer
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded bg-slate-300 dark:bg-slate-700" />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">{t.host.username}</p>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tournament Host</p>
                                </div>
                            </div>
                        </div>

                        {/* REGISTRATION CTA */}
                        {t.status === 'open' ? (
                            <div className="bg-indigo-600 dark:bg-indigo-500 rounded-lg p-8 text-white shadow-lg shadow-indigo-600/30">
                                <h4 className="text-base font-bold tracking-tight uppercase">
                                    Register Now
                                </h4>
                                <p className="mt-2 mb-6 text-xs font-medium text-indigo-100">
                                    Dapatkan kesempatan memenangkan total
                                    prizepool {t.prize_pool[0].prize}.
                                </p>
                                <button className="w-full bg-white rounded py-3 text-xs font-bold text-indigo-600 uppercase shadow-md transition-all hover:shadow-lg hover:scale-105 active:scale-95">
                                    Join Tournament
                                </button>
                            </div>
                        ) : (
                            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-8">
                                <h4 className="mb-4 text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                                    Registration Closed
                                </h4>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 italic">
                                    This tournament is no longer accepting registrations.
                                </p>
                            </div>
                        )}

                        {/* QUICK STATS */}
                        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-6">
                            <div className="space-y-4">
                                <QuickStat label="Status" value={t.status.toUpperCase()} />
                                <div className="border-t border-slate-200 dark:border-slate-800" />
                                <QuickStat label="Gamemode" value={t.gamemode} />
                                <div className="border-t border-slate-200 dark:border-slate-800" />
                                <QuickStat label="Start Date" value={t.start_datetime} />
                                <div className="border-t border-slate-200 dark:border-slate-800" />
                                <QuickStat label="End Date" value={t.end_datetime} />
                            </div>
                        </div>

                        {/* STAFF ACTIONS */}
                        <StaffActionsWidget tournament={t} user={null} />
                    </aside>
                </div>

                {/* MODALS */}
                {showRegistration && (
                    <RegistrationModal
                        tournament={t}
                        user={null}
                        onClose={() => setShowRegistration(false)}
                    />
                )}

                {selectedMap && (
                    <MappoolPreviewModal
                        map={selectedMap}
                        onClose={() => setSelectedMap(null)}
                    />
                )}
            </main>

            <Footer className="mt-32" />
        </div>
    );
}

// ── SUBCOMPONENTS ──
function MatchCard({ lobby }: any) {
    const blueWin = lobby.score?.blue > lobby.score?.red;
    const redWin = lobby.score?.red > lobby.score?.blue;
    return (
        <div className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-3">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                        20:00
                    </span>
                    {lobby.status === 'live' && (
                        <span className="animate-pulse bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                            LIVE
                        </span>
                    )}
                </div>
                <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    {lobby.name}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
                <div
                    className={cn(
                        'flex-1 border rounded p-4 text-center transition-all',
                        blueWin
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800',
                    )}
                >
                    <span
                        className={cn(
                            'text-sm font-bold',
                            blueWin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400',
                        )}
                    >
                        {lobby.team_one.name}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-3xl font-bold italic">
                    <span
                        className={blueWin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}
                    >
                        {lobby.score.blue}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">:</span>
                    <span
                        className={redWin ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-500'}
                    >
                        {lobby.score.red}
                    </span>
                </div>
                <div
                    className={cn(
                        'flex-1 border rounded p-4 text-center transition-all',
                        redWin
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800',
                    )}
                >
                    <span
                        className={cn(
                            'text-sm font-bold',
                            redWin ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400',
                        )}
                    >
                        {lobby.team_two.name}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-3">
                <StaffInfo
                    icon={<MonitorPlay size={12} />}
                    value={lobby.streamer}
                />
                <StaffInfo icon={<Mic size={12} />} value={lobby.caster} />
                <StaffInfo
                    icon={<ShieldCheck size={12} />}
                    value={lobby.referees[0].name}
                />
            </div>
        </div>
    );
}

function StatWidget({ label, value, icon }: any) {
    return (
        <div className="flex min-w-[100px] flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                {icon}
                <p className="text-xs font-semibold tracking-wider uppercase">
                    {label}
                </p>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    );
}

function SocialLink({ icon, label, url }: any) {
    return (
        <a
            href={url}
            target="_blank"
            className="flex items-center justify-between border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
        >
            <div className="flex items-center gap-3">
                {icon} {label}
            </div>
            <ExternalLink size={12} className="text-slate-400 dark:text-slate-600" />
        </a>
    );
}

function StaffInfo({ icon, value }: any) {
    return (
        <div className="flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-800 px-2 text-center last:border-0">
            <span className="mb-1 text-slate-500 dark:text-slate-400">{icon}</span>
            <span className="w-full truncate text-xs font-semibold text-slate-600 dark:text-slate-400">
                {value || '-'}
            </span>
        </div>
    );
}

function ResourceLink({ icon, label, url }: any) {
    return (
        <a
            href={url}
            target="_blank"
            className="flex items-center justify-between border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-all hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
        >
            <div className="flex items-center gap-3">
                {icon} {label}
            </div>
            <ExternalLink size={12} className="text-slate-400 dark:text-slate-600" />
        </a>
    );
}

function DocumentLink({ icon, label }: any) {
    return (
        <button className="flex w-full items-center justify-between border border-stone-800 bg-stone-900/40 p-4 text-[11px] font-bold text-stone-400 transition-all hover:border-pink-500/50 hover:bg-stone-800/40">
            <div className="flex items-center gap-3">
                {icon} {label}
            </div>
            <ExternalLink size={12} className="text-stone-800" />
        </button>
    );
}

function QuickStat({ label, value }: any) {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">{label}</span>
            <span className="font-bold text-slate-900 dark:text-white">{value}</span>
        </div>
    );
}

function StatsCard({ round, stat1, stat2, stat3, accentColor }: any) {
    return (
        <div className={cn(
            'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 rounded-lg transition-all hover:shadow-md',
            accentColor
        )}>
            <h4 className="mb-4 text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {round}
            </h4>
            <div className="space-y-3">
                <StatItem label={stat1.label} value={stat1.value} />
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <StatItem label={stat2.label} value={stat2.value} />
                <div className="border-t border-slate-200 dark:border-slate-800" />
                <StatItem label={stat3.label} value={stat3.value} />
            </div>
        </div>
    );
}

function StatItem({ label, value }: any) {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-bold text-slate-900 dark:text-white">{value}</span>
        </div>
    );
}

// ── MAP CARD ──────────────────────────────────────────────────────────────────

function MapCard({
    map,
    cfg,
}: {
    map: MapEntry;
    cfg: { accent: string; text: string; bg: string; label: string };
}) {
    return (
        <div
            className={cn(
                'group flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700',
            )}
        >
            {/* Cover image */}
            <div className="relative h-28 overflow-hidden">
                <img
                    src={map.cover}
                    alt={map.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* SR overlay */}
                <span className="absolute right-2.5 bottom-2 text-xs font-bold text-white/90 drop-shadow">
                    {map.sr}
                    <span className="text-orange-400">★</span>
                </span>
            </div>

            {/* Detail row: left col (ID + skillset) | right col (info) */}
            <div className={cn('flex flex-1 border-l-4', cfg.accent)}>
                {/* Left: ID badge + skillset tags */}
                <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 border-r border-slate-200 dark:border-slate-800 px-1 py-3">
                    {/* Map ID */}
                    <span
                        className={cn(
                            'text-center text-xs leading-tight font-bold',
                            cfg.text,
                        )}
                    >
                        {map.id}
                    </span>
                    {/* Skillset — abbreviated */}
                    <div className="mt-0.5 flex flex-col items-center gap-0.5">
                        {map.skillset.slice(0, 3).map((skill) => (
                            <span
                                key={skill}
                                className={cn(
                                    'px-1 py-0.5 text-center text-xs leading-tight font-semibold rounded',
                                    SKILL_STYLE[skill] ??
                                        'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
                                )}
                            >
                                {skill.length > 6
                                    ? skill.slice(0, 5) + '…'
                                    : skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Song info */}
                <div className="flex min-w-0 flex-1 flex-col justify-between px-2.5 py-3">
                    {/* Title */}
                    <div>
                        <p className="line-clamp-1 text-xs leading-tight font-bold text-slate-900 dark:text-white">
                            {map.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                            {map.artist}
                        </p>
                        <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400 italic">
                            {map.difficulty}
                        </p>
                    </div>

                    {/* Attributes */}
                    <div className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5">
                        <Attr label="BPM" value={map.bpm} />
                        <Attr label="CS" value={map.cs} />
                        <Attr label="AR" value={map.ar} />
                        <Attr label="Len" value={map.length} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── ATTRIBUTE DISPLAY ────────────────────────────────────────────────────────

function Attr({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex items-baseline gap-0.5 text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-400 uppercase">{label}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{value}</span>
        </span>
    );
}

