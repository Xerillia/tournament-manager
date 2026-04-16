export type Mappool = {
    id: number;
    round: string;
};

export type MappoolFormat = {
    id: number;
    rounds: Round[];
};

export type Round = {
    id: number;
    round: string;
    slots: Slot[];
};

export type Slot = {
    id: number;
    slot: string;
    count: number;
};
