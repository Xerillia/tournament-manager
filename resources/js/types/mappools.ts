import { Beatmap } from './beatmaps';

export type Mappool = {
    id: number;
    round: string;
    formats: Format[];
    suggestions: Suggestion[];
};

export type Format = {
    id: number;
    mappool_id: number;
    slot: string;
    count: number;
};

export type Suggestion = {
    id: number;
    mappool_id: number;
    mappool: Mappool;
    beatmap_id: number;
    beatmap: Beatmap;
    mods: string;
    tags: string;
};
