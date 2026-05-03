import { User } from './auth';

export type SuggestionComment = {
    id: number;
    parent_id?: number;
    parent?: SuggestionComment;
    comment_id?: number;
    mappool_suggestion_id?: number;
    comment: Comment;
};

export type Comment = {
    id: number;
    user: User;
    message: string;
    created_at: Date;
    updated_at: Date;
};
