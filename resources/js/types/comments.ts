import { User } from './auth';

export type Comment = {
    user: User;
    message: string;
};
