import { Suggestion } from './suggestion';

export type Mappool = {
    id: number;
    round: string;
    formats: Format[];
    slug: string;
    star_rating: number | string;
    suggestions: Suggestion[];
};

export type Format = {
    id: number;
    mappool_id: number;
    slot: string;
    count: number;
};
