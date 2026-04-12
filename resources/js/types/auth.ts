export type User = {
    id: number;
    username: string;
    country_name: string;
    discord: string;
};

export type Auth = {
    user: User;
};
