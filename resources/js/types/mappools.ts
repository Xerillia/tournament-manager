import { Beatmap } from './beatmaps';

export type Mappool = {
    id: number;
    round: string;
    formats: Format[];
    beatmaps: Beatmap[];
};

export type Format = {
    id: number;
    mappool_id: number;
    slot: string;
    count: number;
};
