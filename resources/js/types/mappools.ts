import { Suggestion } from './suggestion';

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
