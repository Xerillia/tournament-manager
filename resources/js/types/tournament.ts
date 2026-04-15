import { Mode, TournamentStatus } from '@/enums';
import { User } from './auth';

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
    status: TournamentStatus;
    links: Link[];
};

export type Link = {
    label: string;
    url: string;
    id: number;
};
