import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/layouts/app/app-header-layout';
import Footer from '@/layouts/app/app-footer-layout';
import { cn } from '@/lib/utils';

// ── TYPES ─────────────────────────────────────────────────────────────────────

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

// ── MOD CONFIG ────────────────────────────────────────────────────────────────

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

// ── SKILLSET STYLES ────────────────────────────────────────────────────────────

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

// ── COVER POOL (osu! CDN) ─────────────────────────────────────────────────────

const C = [
    'https://assets.ppy.sh/beatmaps/1011055/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1410543/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/892790/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1046040/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1345734/covers/cover.jpg',
    'https://assets.ppy.sh/beatmaps/1592095/covers/cover.jpg',
];

// ── MAP FACTORY ───────────────────────────────────────────────────────────────

function m(
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
    cover: number,
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
        cover: C[cover % C.length],
        skillset,
    };
}

// ── STAGE DATA ────────────────────────────────────────────────────────────────

const STAGES: StagePool[] = [
    // ─── QUALIFIERS: 4NM 2HD 2HR 2DT 1FM ────────────────────────────────────
    {
        id: 'qualifiers',
        label: 'Qualifiers',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        "First Storm (KonranP's Japanese Ver.)",
                        'DECO*27',
                        '-Miya',
                        "Alerr's Overdose",
                        '5.62',
                        '190',
                        '03:46',
                        '4.3',
                        '9.4',
                        0,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'NM2',
                        'Night of Knights',
                        'FLOWREATING',
                        'Alheak',
                        'Extra',
                        '5.45',
                        '180',
                        '03:12',
                        '4.0',
                        '9.3',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'NM3',
                        'ouroboros -twin stroke of the end-',
                        'Silentroom×Frums',
                        'Minato Yukina',
                        'Calamity',
                        '6.12',
                        '240',
                        '04:02',
                        '4.0',
                        '9.5',
                        2,
                        ['Tech', 'Reading'],
                    ),
                    m(
                        'NM4',
                        'Grievous Lady',
                        'Team Grimoire',
                        'Spectator',
                        'Phantasm',
                        '6.54',
                        '222',
                        '03:55',
                        '3.8',
                        '9.5',
                        3,
                        ['Wiggle', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Yoru ni Kakeru',
                        'YOASOBI',
                        'Bunnrei',
                        'Dusk',
                        '5.74',
                        '130',
                        '03:33',
                        '4.0',
                        '9.2',
                        4,
                        ['Low AR', 'Jump'],
                    ),
                    m(
                        'HD2',
                        'Renegade',
                        'Aaryn',
                        'Taiyi',
                        'Rebellion',
                        '6.12',
                        '200',
                        '03:48',
                        '3.5',
                        '9.0',
                        5,
                        ['Low AR', 'Reading'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Firestorm',
                        'Camellia',
                        'Hareimu',
                        'Inferno',
                        '6.88',
                        '260',
                        '03:20',
                        '5.5',
                        '10.0',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'HR2',
                        'Chronostasis',
                        'xi',
                        'Xinnoh',
                        'Pleiades',
                        '6.33',
                        '195',
                        '03:44',
                        '5.0',
                        '10.0',
                        2,
                        ['Jump', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Senbonzakura',
                        'Hatsune Miku',
                        'ekr-',
                        'Overdose',
                        '7.11',
                        '238 (158)',
                        '03:55',
                        '4.0',
                        '10.3',
                        4,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Freedom Dive',
                        'xi',
                        'Spectator',
                        'FOUR DIMENSIONS',
                        '8.03',
                        '222 (148)',
                        '03:48',
                        '3.5',
                        '10.5',
                        3,
                        ['Deathstream', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Artificial Stars',
                        'Silentroom',
                        'Jemzuu',
                        'Illumination',
                        '5.88',
                        '175',
                        '04:10',
                        '4.2',
                        '9.1',
                        0,
                        ['Precision', 'Tech'],
                    ),
                ],
            },
        ],
    },

    // ─── RO16: 5NM 2HD 2HR 3DT 2FM 1TB ──────────────────────────────────────
    {
        id: 'ro16',
        label: 'Round of 16',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        "First Storm (KonranP's Japanese Ver.)",
                        'DECO*27',
                        '-Miya',
                        "Alerr's Overdose",
                        '5.62',
                        '190',
                        '03:46',
                        '4.3',
                        '9.4',
                        0,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'NM2',
                        'Night of Knights',
                        'FLOWREATING',
                        'Alheak',
                        'Extra',
                        '5.88',
                        '186',
                        '03:28',
                        '4.0',
                        '9.4',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'NM3',
                        'ouroboros -twin stroke of the end-',
                        'Silentroom×Frums',
                        'Minato Yukina',
                        'Calamity',
                        '6.23',
                        '240',
                        '04:02',
                        '4.0',
                        '9.5',
                        2,
                        ['Tech', 'Reading'],
                    ),
                    m(
                        'NM4',
                        'Grievous Lady',
                        'Team Grimoire',
                        'Spectator',
                        'Phantasm',
                        '6.67',
                        '222',
                        '03:55',
                        '3.8',
                        '9.5',
                        3,
                        ['Wiggle', 'FingCon'],
                    ),
                    m(
                        'NM5',
                        'Sayonara Heaven',
                        'n-buna',
                        'Jemzuu',
                        'Eternity',
                        '6.88',
                        '210',
                        '04:18',
                        '3.5',
                        '9.6',
                        5,
                        ['Jump', 'Precision'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Yoru ni Kakeru',
                        'YOASOBI',
                        'Bunnrei',
                        'Dusk',
                        '5.74',
                        '130',
                        '03:33',
                        '4.0',
                        '9.2',
                        4,
                        ['Low AR', 'Jump'],
                    ),
                    m(
                        'HD2',
                        'Renegade',
                        'Aaryn',
                        'Taiyi',
                        'Rebellion',
                        '6.18',
                        '200',
                        '03:48',
                        '3.5',
                        '9.0',
                        5,
                        ['Low AR', 'Reading'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Firestorm',
                        'Camellia',
                        'Hareimu',
                        'Inferno',
                        '6.88',
                        '260',
                        '03:20',
                        '5.5',
                        '10.0',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'HR2',
                        'Chronostasis',
                        'xi',
                        'Xinnoh',
                        'Pleiades',
                        '6.41',
                        '198',
                        '03:44',
                        '5.0',
                        '10.0',
                        2,
                        ['Jump', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Senbonzakura',
                        'Hatsune Miku',
                        'ekr-',
                        'Overdose',
                        '7.11',
                        '238 (158)',
                        '03:55',
                        '4.0',
                        '10.3',
                        4,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Freedom Dive',
                        'xi',
                        'Spectator',
                        'FOUR DIMENSIONS',
                        '8.03',
                        '222 (148)',
                        '03:48',
                        '3.5',
                        '10.5',
                        3,
                        ['Deathstream', 'Alt'],
                    ),
                    m(
                        'DT3',
                        'World Vanquisher',
                        'Camellia',
                        'Maitoo',
                        'Conqueror',
                        '7.55',
                        '204 (136)',
                        '04:22',
                        '4.0',
                        '10.0',
                        0,
                        ['Jump', 'Reading'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Artificial Stars',
                        'Silentroom',
                        'Jemzuu',
                        'Illumination',
                        '5.88',
                        '175',
                        '04:10',
                        '4.2',
                        '9.1',
                        0,
                        ['Precision', 'Tech'],
                    ),
                    m(
                        'FM2',
                        'Burning Embers',
                        'Silentroom',
                        'Hareimu',
                        'Scorched',
                        '6.22',
                        '185',
                        '03:52',
                        '4.0',
                        '9.3',
                        1,
                        ['Stacking', 'Wiggle'],
                    ),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    m(
                        'TB',
                        'Last Regrets -Eternal Lullaby-',
                        'Silentroom',
                        'Maitoo & Jemzuu',
                        'Requiem',
                        '8.91',
                        '280',
                        '06:12',
                        '4.0',
                        '9.8',
                        3,
                        ['Jump', 'Stream', 'Tech'],
                    ),
                ],
            },
        ],
    },

    // ─── QUARTERFINALS: 5NM 3HD 3HR 3DT 3FM 1TB ─────────────────────────────
    {
        id: 'qf',
        label: 'Quarterfinals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        "First Storm (KonranP's Japanese Ver.)",
                        'DECO*27',
                        '-Miya',
                        "Alerr's Overdose",
                        '6.00',
                        '192',
                        '03:46',
                        '4.3',
                        '9.4',
                        0,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'NM2',
                        'Night of Knights',
                        'FLOWREATING',
                        'Alheak',
                        'Extra',
                        '6.15',
                        '188',
                        '03:28',
                        '4.0',
                        '9.5',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'NM3',
                        'ouroboros -twin stroke of the end-',
                        'Silentroom×Frums',
                        'Minato Yukina',
                        'Calamity',
                        '6.44',
                        '240',
                        '04:02',
                        '4.0',
                        '9.5',
                        2,
                        ['Tech', 'Reading'],
                    ),
                    m(
                        'NM4',
                        'Grievous Lady',
                        'Team Grimoire',
                        'Spectator',
                        'Phantasm',
                        '6.82',
                        '222',
                        '03:55',
                        '3.8',
                        '9.6',
                        3,
                        ['Wiggle', 'FingCon'],
                    ),
                    m(
                        'NM5',
                        'Sayonara Heaven',
                        'n-buna',
                        'Jemzuu',
                        'Eternity',
                        '7.10',
                        '215',
                        '04:18',
                        '3.5',
                        '9.7',
                        5,
                        ['Jump', 'Precision'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Yoru ni Kakeru',
                        'YOASOBI',
                        'Bunnrei',
                        'Dusk',
                        '6.00',
                        '132',
                        '03:33',
                        '4.0',
                        '9.2',
                        4,
                        ['Low AR', 'Jump'],
                    ),
                    m(
                        'HD2',
                        'Renegade',
                        'Aaryn',
                        'Taiyi',
                        'Rebellion',
                        '6.31',
                        '204',
                        '03:48',
                        '3.5',
                        '9.0',
                        5,
                        ['Low AR', 'Reading'],
                    ),
                    m(
                        'HD3',
                        'Lunar Eclipse',
                        'xi',
                        'Xinnoh',
                        'Supernova',
                        '6.55',
                        '175',
                        '04:00',
                        '3.8',
                        '8.8',
                        2,
                        ['Low AR', 'Tech'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Firestorm',
                        'Camellia',
                        'Hareimu',
                        'Inferno',
                        '7.12',
                        '265',
                        '03:20',
                        '5.5',
                        '10.0',
                        1,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'HR2',
                        'Chronostasis',
                        'xi',
                        'Xinnoh',
                        'Pleiades',
                        '6.78',
                        '200',
                        '03:44',
                        '5.0',
                        '10.0',
                        2,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'HR3',
                        'Reach for the Stars',
                        'Cash Cash',
                        'Nelly',
                        'Expert',
                        '6.44',
                        '176',
                        '03:57',
                        '5.2',
                        '9.8',
                        5,
                        ['Alt', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Senbonzakura',
                        'Hatsune Miku',
                        'ekr-',
                        'Overdose',
                        '7.44',
                        '238 (158)',
                        '03:55',
                        '4.0',
                        '10.3',
                        4,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Freedom Dive',
                        'xi',
                        'Spectator',
                        'FOUR DIMENSIONS',
                        '8.33',
                        '222 (148)',
                        '03:48',
                        '3.5',
                        '10.5',
                        3,
                        ['Deathstream', 'Alt'],
                    ),
                    m(
                        'DT3',
                        'World Vanquisher',
                        'Camellia',
                        'Maitoo',
                        'Conqueror',
                        '7.88',
                        '204 (136)',
                        '04:22',
                        '4.0',
                        '10.0',
                        0,
                        ['Jump', 'Reading'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Artificial Stars',
                        'Silentroom',
                        'Jemzuu',
                        'Illumination',
                        '6.10',
                        '178',
                        '04:10',
                        '4.2',
                        '9.1',
                        0,
                        ['Precision', 'Tech'],
                    ),
                    m(
                        'FM2',
                        'Burning Embers',
                        'Silentroom',
                        'Hareimu',
                        'Scorched',
                        '6.44',
                        '188',
                        '03:52',
                        '4.0',
                        '9.3',
                        1,
                        ['Stacking', 'Wiggle'],
                    ),
                    m(
                        'FM3',
                        'Eclipse Dancer',
                        'Camellia',
                        'Taiyi',
                        'Orbit',
                        '6.70',
                        '195',
                        '04:05',
                        '3.8',
                        '9.4',
                        2,
                        ['Jump', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    m(
                        'TB',
                        'Last Regrets -Eternal Lullaby-',
                        'Silentroom',
                        'Maitoo & Jemzuu',
                        'Requiem',
                        '9.10',
                        '285',
                        '06:22',
                        '4.0',
                        '9.8',
                        3,
                        ['Jump', 'Stream', 'Tech'],
                    ),
                ],
            },
        ],
    },

    // ─── SEMIFINALS: 5NM 3HD 3HR 3DT 3FM 1TB ─────────────────────────────────
    {
        id: 'sf',
        label: 'Semifinals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        'Crimson Throne',
                        'Silentroom',
                        'Jemzuu',
                        'Imperial',
                        '6.44',
                        '210',
                        '04:10',
                        '4.0',
                        '9.6',
                        0,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'NM2',
                        'Hollow Paradox',
                        'Camellia',
                        'Hareimu',
                        'Void',
                        '6.66',
                        '220',
                        '03:58',
                        '3.8',
                        '9.6',
                        1,
                        ['Stream', 'Precision'],
                    ),
                    m(
                        'NM3',
                        'Neon Vertigo',
                        'xi',
                        'ekr-',
                        'Cascade',
                        '6.88',
                        '235',
                        '04:22',
                        '3.6',
                        '9.7',
                        2,
                        ['Tech', 'Reading'],
                    ),
                    m(
                        'NM4',
                        'Stellar Collapse',
                        'FLOWREATING',
                        'Spectator',
                        'Supernova',
                        '7.12',
                        '248',
                        '03:55',
                        '3.5',
                        '9.7',
                        3,
                        ['Wiggle', 'FingCon'],
                    ),
                    m(
                        'NM5',
                        'Last Resonance',
                        'n-buna',
                        'Maitoo',
                        'Resonance',
                        '7.44',
                        '225',
                        '04:30',
                        '3.5',
                        '9.8',
                        4,
                        ['Jump', 'Deathstream'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Fade to White',
                        'YOASOBI',
                        'Bunnrei',
                        'Whiteout',
                        '6.22',
                        '140',
                        '03:45',
                        '4.0',
                        '9.0',
                        5,
                        ['Low AR', 'Jump'],
                    ),
                    m(
                        'HD2',
                        'Phantom Signal',
                        'Aaryn',
                        'Taiyi',
                        'Ghost',
                        '6.55',
                        '212',
                        '04:00',
                        '3.5',
                        '8.8',
                        0,
                        ['Low AR', 'Reading'],
                    ),
                    m(
                        'HD3',
                        'Dark Orbit',
                        'xi',
                        'Xinnoh',
                        'Eclipse',
                        '6.88',
                        '185',
                        '04:15',
                        '3.8',
                        '8.6',
                        1,
                        ['Low AR', 'Tech'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Blazing Fury',
                        'Camellia',
                        'Hareimu',
                        'Conflagration',
                        '7.33',
                        '272',
                        '03:28',
                        '5.5',
                        '10.0',
                        2,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'HR2',
                        'Iron Resolve',
                        'xi',
                        'Xinnoh',
                        'Adamant',
                        '6.99',
                        '205',
                        '03:55',
                        '5.0',
                        '10.0',
                        3,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'HR3',
                        'Cascade Effect',
                        'Cash Cash',
                        'Nelly',
                        'Overload',
                        '6.66',
                        '182',
                        '04:05',
                        '5.2',
                        '9.9',
                        4,
                        ['Alt', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Rapid Spiral',
                        'Hatsune Miku',
                        'ekr-',
                        'Vortex',
                        '7.77',
                        '252 (168)',
                        '04:02',
                        '4.0',
                        '10.4',
                        5,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Zero Gravity',
                        'xi',
                        'Spectator',
                        'Weightless',
                        '8.55',
                        '234 (156)',
                        '03:52',
                        '3.5',
                        '10.6',
                        0,
                        ['Deathstream', 'Alt'],
                    ),
                    m(
                        'DT3',
                        'Cosmic Surge',
                        'Camellia',
                        'Maitoo',
                        'Supernova',
                        '8.11',
                        '216 (144)',
                        '04:30',
                        '4.0',
                        '10.2',
                        1,
                        ['Jump', 'Reading'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Mirror Maze',
                        'Silentroom',
                        'Jemzuu',
                        'Reflection',
                        '6.33',
                        '182',
                        '04:18',
                        '4.2',
                        '9.2',
                        2,
                        ['Precision', 'Tech'],
                    ),
                    m(
                        'FM2',
                        'Solar Wind',
                        'Silentroom',
                        'Hareimu',
                        'Corona',
                        '6.66',
                        '195',
                        '04:02',
                        '4.0',
                        '9.4',
                        3,
                        ['Stacking', 'Wiggle'],
                    ),
                    m(
                        'FM3',
                        'Orbital Decay',
                        'Camellia',
                        'Taiyi',
                        'Perihelion',
                        '6.99',
                        '202',
                        '04:12',
                        '3.8',
                        '9.5',
                        4,
                        ['Jump', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    m(
                        'TB',
                        'Absolute Zero -Terminus-',
                        'Silentroom',
                        'Jemzuu & ekr-',
                        'Zero Point',
                        '9.44',
                        '292',
                        '06:44',
                        '4.0',
                        '9.9',
                        5,
                        ['Jump', 'Stream', 'Tech', 'Alt'],
                    ),
                ],
            },
        ],
    },

    // ─── FINALS: 6NM 3HD 3HR 4DT 3FM 1TB ────────────────────────────────────
    {
        id: 'finals',
        label: 'Finals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        'Crimson Throne',
                        'Silentroom',
                        'Jemzuu',
                        'Imperial',
                        '6.66',
                        '215',
                        '04:10',
                        '4.0',
                        '9.7',
                        0,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'NM2',
                        'Hollow Paradox',
                        'Camellia',
                        'Hareimu',
                        'Void',
                        '6.88',
                        '228',
                        '03:58',
                        '3.8',
                        '9.7',
                        1,
                        ['Stream', 'Precision'],
                    ),
                    m(
                        'NM3',
                        'Neon Vertigo',
                        'xi',
                        'ekr-',
                        'Cascade',
                        '7.10',
                        '242',
                        '04:22',
                        '3.6',
                        '9.8',
                        2,
                        ['Tech', 'Reading'],
                    ),
                    m(
                        'NM4',
                        'Stellar Collapse',
                        'FLOWREATING',
                        'Spectator',
                        'Supernova',
                        '7.33',
                        '255',
                        '03:55',
                        '3.5',
                        '9.8',
                        3,
                        ['Wiggle', 'FingCon'],
                    ),
                    m(
                        'NM5',
                        'Last Resonance',
                        'n-buna',
                        'Maitoo',
                        'Resonance',
                        '7.66',
                        '230',
                        '04:30',
                        '3.5',
                        '9.9',
                        4,
                        ['Jump', 'Deathstream'],
                    ),
                    m(
                        'NM6',
                        'Eternia Core',
                        'Camellia',
                        'Taiyi',
                        'Singularity',
                        '7.99',
                        '265',
                        '04:48',
                        '3.3',
                        '9.9',
                        5,
                        ['Tech', 'Speed', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Fade to White',
                        'YOASOBI',
                        'Bunnrei',
                        'Whiteout',
                        '6.44',
                        '145',
                        '03:45',
                        '4.0',
                        '9.0',
                        0,
                        ['Low AR', 'Jump'],
                    ),
                    m(
                        'HD2',
                        'Phantom Signal',
                        'Aaryn',
                        'Taiyi',
                        'Ghost',
                        '6.77',
                        '218',
                        '04:00',
                        '3.5',
                        '8.8',
                        1,
                        ['Low AR', 'Reading'],
                    ),
                    m(
                        'HD3',
                        'Dark Orbit',
                        'xi',
                        'Xinnoh',
                        'Eclipse',
                        '7.10',
                        '190',
                        '04:15',
                        '3.8',
                        '8.6',
                        2,
                        ['Low AR', 'Tech'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Blazing Fury',
                        'Camellia',
                        'Hareimu',
                        'Conflagration',
                        '7.55',
                        '278',
                        '03:28',
                        '5.5',
                        '10.0',
                        3,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'HR2',
                        'Iron Resolve',
                        'xi',
                        'Xinnoh',
                        'Adamant',
                        '7.22',
                        '210',
                        '03:55',
                        '5.0',
                        '10.0',
                        4,
                        ['Jump', 'Alt'],
                    ),
                    m(
                        'HR3',
                        'Cascade Effect',
                        'Cash Cash',
                        'Nelly',
                        'Overload',
                        '6.88',
                        '188',
                        '04:05',
                        '5.2',
                        '9.9',
                        5,
                        ['Alt', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Rapid Spiral',
                        'Hatsune Miku',
                        'ekr-',
                        'Vortex',
                        '8.00',
                        '258 (172)',
                        '04:02',
                        '4.0',
                        '10.5',
                        0,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Zero Gravity',
                        'xi',
                        'Spectator',
                        'Weightless',
                        '8.77',
                        '240 (160)',
                        '03:52',
                        '3.5',
                        '10.7',
                        1,
                        ['Deathstream', 'Alt'],
                    ),
                    m(
                        'DT3',
                        'Cosmic Surge',
                        'Camellia',
                        'Maitoo',
                        'Supernova',
                        '8.33',
                        '222 (148)',
                        '04:30',
                        '4.0',
                        '10.3',
                        2,
                        ['Jump', 'Reading'],
                    ),
                    m(
                        'DT4',
                        'Hyperdrive',
                        'Camellia',
                        'Jemzuu',
                        'Overdrive',
                        '9.11',
                        '270 (180)',
                        '04:00',
                        '3.5',
                        '10.8',
                        3,
                        ['Deathstream', 'Speed'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Mirror Maze',
                        'Silentroom',
                        'Jemzuu',
                        'Reflection',
                        '6.55',
                        '188',
                        '04:18',
                        '4.2',
                        '9.3',
                        4,
                        ['Precision', 'Tech'],
                    ),
                    m(
                        'FM2',
                        'Solar Wind',
                        'Silentroom',
                        'Hareimu',
                        'Corona',
                        '6.88',
                        '200',
                        '04:02',
                        '4.0',
                        '9.5',
                        5,
                        ['Stacking', 'Wiggle'],
                    ),
                    m(
                        'FM3',
                        'Orbital Decay',
                        'Camellia',
                        'Taiyi',
                        'Perihelion',
                        '7.22',
                        '208',
                        '04:12',
                        '3.8',
                        '9.6',
                        0,
                        ['Jump', 'FingCon'],
                    ),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    m(
                        'TB',
                        'GENOCIDER -Final Execution-',
                        'Camellia feat. Nanahira',
                        'Jemzuu & Maitoo',
                        'Extinction',
                        '9.88',
                        '300',
                        '07:00',
                        '4.0',
                        '10.0',
                        1,
                        ['Jump', 'Stream', 'Tech', 'Speed', 'Alt'],
                    ),
                ],
            },
        ],
    },

    // ─── GRAND FINALS: 6NM 3HD 3HR 4DT 3FM 1TB ──────────────────────────────
    {
        id: 'gf',
        label: 'Grand Finals',
        groups: [
            {
                mod: 'NM',
                maps: [
                    m(
                        'NM1',
                        'Eternal Stratosphere',
                        'Silentroom',
                        'Jemzuu',
                        'Zenith',
                        '7.00',
                        '220',
                        '04:22',
                        '4.0',
                        '9.8',
                        2,
                        ['Jump', 'Alt', 'Precision'],
                    ),
                    m(
                        'NM2',
                        'Void Sequence',
                        'Camellia',
                        'ekr-',
                        'Nullspace',
                        '7.22',
                        '235',
                        '04:10',
                        '3.8',
                        '9.8',
                        3,
                        ['Stream', 'Speed'],
                    ),
                    m(
                        'NM3',
                        'Paradox Engine',
                        'xi',
                        'Spectator',
                        'Anomaly',
                        '7.55',
                        '250',
                        '04:35',
                        '3.5',
                        '9.9',
                        4,
                        ['Tech', 'Reading', 'Wiggle'],
                    ),
                    m(
                        'NM4',
                        'Quantum Rift',
                        'FLOWREATING',
                        'Hareimu',
                        'Singularity',
                        '7.77',
                        '262',
                        '04:05',
                        '3.5',
                        '9.9',
                        5,
                        ['FingCon', 'Deathstream'],
                    ),
                    m(
                        'NM5',
                        'Infinite Regress',
                        'n-buna',
                        'Maitoo',
                        'Loop',
                        '8.00',
                        '240',
                        '04:48',
                        '3.3',
                        '10.0',
                        0,
                        ['Jump', 'Alt', 'Speed'],
                    ),
                    m(
                        'NM6',
                        'Absolute Reality',
                        'Camellia',
                        'Taiyi',
                        'Transcendence',
                        '8.33',
                        '275',
                        '05:02',
                        '3.0',
                        '10.0',
                        1,
                        ['Tech', 'Stream', 'Precision'],
                    ),
                ],
            },
            {
                mod: 'HD',
                maps: [
                    m(
                        'HD1',
                        'Phantom Horizon',
                        'YOASOBI',
                        'Bunnrei',
                        'Mirage',
                        '6.66',
                        '148',
                        '03:55',
                        '4.0',
                        '9.0',
                        2,
                        ['Low AR', 'Jump', 'Stacking'],
                    ),
                    m(
                        'HD2',
                        'Ghost Protocol',
                        'Aaryn',
                        'Taiyi',
                        'Specter',
                        '6.99',
                        '225',
                        '04:10',
                        '3.5',
                        '8.8',
                        3,
                        ['Low AR', 'Reading', 'FingCon'],
                    ),
                    m(
                        'HD3',
                        'Nebula Drift',
                        'xi',
                        'Xinnoh',
                        'Interstellar',
                        '7.33',
                        '198',
                        '04:25',
                        '3.8',
                        '8.5',
                        4,
                        ['Low AR', 'Tech', 'Wiggle'],
                    ),
                ],
            },
            {
                mod: 'HR',
                maps: [
                    m(
                        'HR1',
                        'Supernova Burst',
                        'Camellia',
                        'Hareimu',
                        'Hypernova',
                        '7.77',
                        '285',
                        '03:35',
                        '5.5',
                        '10.0',
                        5,
                        ['Stream', 'Speed', 'Deathstream'],
                    ),
                    m(
                        'HR2',
                        'Diamond Precision',
                        'xi',
                        'Xinnoh',
                        'Flawless',
                        '7.44',
                        '215',
                        '04:00',
                        '5.0',
                        '10.0',
                        0,
                        ['Jump', 'Alt', 'Precision'],
                    ),
                    m(
                        'HR3',
                        'Velocity Storm',
                        'Cash Cash',
                        'Nelly',
                        'Tempest',
                        '7.11',
                        '195',
                        '04:12',
                        '5.2',
                        '9.9',
                        1,
                        ['Alt', 'FingCon', 'Stream'],
                    ),
                ],
            },
            {
                mod: 'DT',
                maps: [
                    m(
                        'DT1',
                        'Lightspeed',
                        'Hatsune Miku',
                        'ekr-',
                        'Warp',
                        '8.22',
                        '264 (176)',
                        '04:08',
                        '4.0',
                        '10.6',
                        2,
                        ['Stream', 'Deathstream'],
                    ),
                    m(
                        'DT2',
                        'Event Horizon',
                        'xi',
                        'Spectator',
                        'Singularity',
                        '9.00',
                        '246 (164)',
                        '03:58',
                        '3.5',
                        '10.8',
                        3,
                        ['Deathstream', 'Alt', 'Speed'],
                    ),
                    m(
                        'DT3',
                        'Dark Matter',
                        'Camellia',
                        'Maitoo',
                        'Accretion',
                        '8.55',
                        '228 (152)',
                        '04:36',
                        '4.0',
                        '10.4',
                        4,
                        ['Jump', 'Reading', 'FingCon'],
                    ),
                    m(
                        'DT4',
                        'Overdrive EX',
                        'Camellia',
                        'Jemzuu',
                        'Critical Mass',
                        '9.44',
                        '276 (184)',
                        '04:05',
                        '3.5',
                        '10.9',
                        5,
                        ['Deathstream', 'Speed', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'FM',
                maps: [
                    m(
                        'FM1',
                        'Chaos Theory',
                        'Silentroom',
                        'Jemzuu',
                        'Entropy',
                        '6.77',
                        '192',
                        '04:25',
                        '4.2',
                        '9.4',
                        0,
                        ['Precision', 'Tech', 'Stacking'],
                    ),
                    m(
                        'FM2',
                        'Fractal Bloom',
                        'Silentroom',
                        'Hareimu',
                        'Mandelbrot',
                        '7.11',
                        '205',
                        '04:10',
                        '4.0',
                        '9.6',
                        1,
                        ['Wiggle', 'FingCon', 'Jump'],
                    ),
                    m(
                        'FM3',
                        'Entropy Rising',
                        'Camellia',
                        'Taiyi',
                        'Disorder',
                        '7.44',
                        '215',
                        '04:20',
                        '3.8',
                        '9.7',
                        2,
                        ['Jump', 'Stream', 'Alt'],
                    ),
                ],
            },
            {
                mod: 'TB',
                maps: [
                    m(
                        'TB',
                        'END OF TIME -Absolute Finality-',
                        'Silentroom×Camellia',
                        'All-Stars Team',
                        'Omega',
                        '10.00',
                        '310',
                        '07:30',
                        '4.0',
                        '10.0',
                        3,
                        ['Jump', 'Stream', 'Tech', 'Alt', 'Speed', 'Precision'],
                    ),
                ],
            },
        ],
    },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Mappools() {
    const [activeStage, setActiveStage] = useState('qualifiers');

    const stage = STAGES.find((s) => s.id === activeStage) ?? STAGES[0];

    return (
        <div className="min-h-screen bg-[#110F0E] font-['Plus_Jakarta_Sans',_sans-serif] text-[#FCF9F9] selection:bg-[#46A9D7]/20">
            <Head title="Mappools" />
            <Navbar />

            {/* ── HERO ── */}
            <header className="relative border-b border-[#382E30] bg-[#2A2224] py-14">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <h1 className="text-5xl leading-[1.1] font-black tracking-tighter text-[#FCF9F9] md:text-6xl">
                        Tournament{' '}
                        <span className="text-[#46A9D7] italic underline decoration-[#46A9D7]/30 underline-offset-8">
                            Mappools
                        </span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base font-medium text-[#8D7A7D]">
                        Map info, attributes, and skillsets for every stage.
                    </p>
                </div>
            </header>

            {/* ── BODY: SIDEBAR + CONTENT ── */}
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex items-start gap-8">
                    {/* ── SIDEBAR ── */}
                    <aside className="sticky top-20 w-48 shrink-0">
                        <p className="mb-3 px-2 text-[10px] font-black tracking-widest text-[#8D7A7D] uppercase">
                            Stage
                        </p>
                        <nav className="flex flex-col gap-1">
                            {STAGES.map((s) => {
                                const totalMaps = s.groups.reduce(
                                    (acc, g) => acc + g.maps.length,
                                    0,
                                );
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveStage(s.id)}
                                        className={cn(
                                            'group flex items-center justify-between px-4 py-3 text-left transition-all',
                                            activeStage === s.id
                                                ? 'bg-[#46A9D7] text-[#110F0E] shadow-md'
                                                : 'text-[#8D7A7D] hover:bg-[#382E30] hover:text-[#FCF9F9]',
                                        )}
                                    >
                                        <span className="text-sm font-black">
                                            {s.label}
                                        </span>
                                        <span
                                            className={cn(
                                                'text-[10px] font-black tabular-nums',
                                                activeStage === s.id
                                                    ? 'text-stone-400'
                                                    : 'text-stone-300 group-hover:text-stone-400',
                                            )}
                                        >
                                            {totalMaps}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Mod legend */}
                        <div className="mt-8 px-2">
                            <p className="mb-2 text-[10px] font-black tracking-widest text-[#8D7A7D] uppercase">
                                Mods
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {Object.entries(MOD_CONFIG).map(
                                    ([key, cfg]) => (
                                        <div
                                            key={key}
                                            className="flex items-center gap-2"
                                        >
                                            <span
                                                className={cn(
                                                    'h-2 w-2',
                                                    cfg.bg,
                                                )}
                                            />
                                            <span className="text-[11px] font-bold text-[#8D7A7D]">
                                                {key} — {cfg.label}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* ── MAIN CONTENT ── */}
                    <main className="min-w-0 flex-1">
                        {stage.groups.map((group) => {
                            const cfg = MOD_CONFIG[group.mod];
                            return (
                                <section key={group.mod} className="mb-10">
                                    {/* Category heading */}
                                    <div className="mb-4 flex items-center gap-3">
                                        <span
                                            className={cn(
                                                'px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase',
                                                cfg.bg,
                                            )}
                                        >
                                            {cfg.label}
                                        </span>
                                        <div className="h-px flex-1 bg-[#382E30]" />
                                        <span className="text-[10px] font-black text-[#8D7A7D]">
                                            {group.maps.length}{' '}
                                            {group.maps.length === 1
                                                ? 'map'
                                                : 'maps'}
                                        </span>
                                    </div>

                                    {/* Cards */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {group.maps.map((map) => (
                                            <MapCard
                                                key={map.id}
                                                map={map}
                                                cfg={cfg}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </main>
                </div>
            </div>

            <Footer className="border-t border-[#382E30] bg-[#1A1618]" />
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
                'group flex flex-col overflow-hidden border border-[#382E30] bg-[#2A2224] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#46A9D7]',
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
                <span className="absolute right-2.5 bottom-2 text-xs font-black text-white/90 tabular-nums drop-shadow">
                    {map.sr}
                    <span className="text-orange-400">★</span>
                </span>
            </div>

            {/* Detail row: left col (ID + skillset) | right col (info) */}
            <div className={cn('flex flex-1 border-l-4', cfg.accent)}>
                {/* Left: ID badge + skillset tags */}
                <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 border-r border-[#382E30] px-1 py-3">
                    {/* Map ID */}
                    <span
                        className={cn(
                            'text-center text-[11px] leading-tight font-black',
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
                                    'px-1 py-0.5 text-center text-[7px] leading-tight font-black',
                                    SKILL_STYLE[skill] ??
                                        'bg-[#382E30] text-[#D2828F]',
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
                        <p className="line-clamp-1 text-[11px] leading-tight font-black text-[#FCF9F9]">
                            {map.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[9px] text-[#8D7A7D]">
                            {map.artist}
                        </p>
                        <p className="line-clamp-1 text-[9px] text-[#8D7A7D] italic">
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

// ── HELPERS ───────────────────────────────────────────────────────────────────

function Attr({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex items-baseline gap-0.5 text-[8px]">
            <span className="font-black text-[#8D7A7D] uppercase">{label}</span>
            <span className="font-bold text-[#D2828F]">{value}</span>
        </span>
    );
}
