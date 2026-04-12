import { Gamemode, TournamentStatus } from '@/enums';
import { User } from './auth';

export type Tournament = {
    id: number;
    host: User;
    name: string;
    caption: string;
    gamemode: Gamemode;
    max_rank: number;
    min_rank: number;
    start_datetime: Date;
    end_datetime: Date;
    status: TournamentStatus;
    forum_post: string;
};
