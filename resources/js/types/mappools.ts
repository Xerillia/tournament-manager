import { FreemodRule } from './freemodrule';
import { Suggestion } from './suggestion';

export type Mappool = {
    id: number;
    round: string;
    formats: Format[];
    slug: string;
    star_rating: number | string;
    suggestions: Suggestion[];
    freemod_rules: FreemodRule[];
};

export type Format = {
    id: number;
    mappool_id: number;
    slot: string;
    count: number;
    slots?: Slot[];
};

export type Slot = {
    id: number;
    mappool_format_id: number;
    suggestion: Suggestion;
    slot: string;
};
