import { Mode } from '@/enums';

export type Beatmap = {
    beatmap_id: number;
    beatmapset_id: number;
    mode: Mode;
    mods: string;
    star_rating: number;
    bpm: number;
    cs: number;
    ar: number;
    od: number;
    drain: number;
    max_combo: number;
    artist: string;
    title: string;
    version: string;
    creator: string;
    creator_id: number;
};
