import { CustomMapStatus } from '@/enums';
import { Mappool } from './mappools';

export type CustomMap = {
    mappool_id: number;
    mappool: Mappool;
    mapper: string;
    beatmap_url: string;
    beatmap_name: string;
    mods: string;
    status: CustomMapStatus;
    bpm: number;
    cs: number;
    ar: number;
    od: number;
};
