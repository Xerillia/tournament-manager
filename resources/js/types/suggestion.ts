import { User } from './auth';
import { Beatmap } from './beatmaps';
import { Comment } from './comments';
import { Mappool } from './mappools';

export type Suggestion = {
    id: number;
    mappool_id: number;
    mappool: Mappool;
    beatmap_id: number;
    beatmap: Beatmap;
    user: User;
    tags: string;
    comments: Comment[];
};
