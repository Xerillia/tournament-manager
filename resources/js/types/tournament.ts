import { Mode, TournamentStatus, WinCondition } from '@/enums';
import { User } from './auth';
import { Mappool } from './mappools';

export type Tournament = {
    id: number;
    host: User;
    name: string;
    caption: string;
    mode: Mode;
    max_rank: number;
    min_rank: number;
    start_datetime: Date;
    end_datetime: Date;
    win_condition: WinCondition;
    status: TournamentStatus;
    links: Link[];
    mappools: Mappool[];
};

export type Link = {
    label: string;
    url: string;
    id: number;
};
