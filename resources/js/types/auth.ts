export type User = {
    id: number;
    osu_id: number;
    username: string;
    country_name: string;
    discord: string;
    avatar_url: string;
};

export type Auth = {
    user: User;
};
