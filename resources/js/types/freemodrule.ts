import { Mappool } from './mappools';

export type FreemodRule = {
    id: number;
    mappool_id: number;
    mappool?: Mappool;
    mod: string;
    allowed: boolean;
    multiplier: number;
};
