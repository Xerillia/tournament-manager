import { User } from './auth';

export type SuggestionComment = {
    comment: Comment;
};

export type Comment = {
    id: number;
    user: User;
    message: string;
    created_at: string;
};
