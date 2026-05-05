import { login, logout } from '@/routes/osu';
import { link, unlink } from '@/routes/discord';
import { createTournament } from '@/routes/tournaments';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

interface SimpleAuthProps {
    user: User;
}
export default function SimpleAuth({ user }: SimpleAuthProps) {
    return (
        <>
            {!user && (
                <Link
                    href={login()}
                    className="bg-green-200 p-2"
                >
                    Login Osu
                </Link>
            )}
            {user && (
                <>
                    <div className="mb-4">
                        <p>
                            Logged in user: <span className="font-bold">{user.username}</span>
                        </p>
                        <p>
                            User Country: <span className="font-bold">{user.country_name}</span>
                        </p>
                        <p>
                            Linked Discord username: <span className="font-bold">{user.discord}</span>
                        </p>
                    </div>
                    <Link
                        href={logout()}
                        className="bg-red-200 p-2 hover:cursor-pointer hover:bg-red-300"
                    >
                        Logout
                    </Link>
                    {!user.discord && (
                        <Link
                            href={link()}
                            className="inline-block bg-yellow-200 p-2 hover:bg-yellow-300"
                        >
                            Link Discord
                        </Link>
                    )}
                    {user.discord && (
                        <Link
                            href={unlink()}
                            method="post"
                            as="button"
                            className="bg-purple-200 p-2 hover:cursor-pointer hover:bg-purple-300"
                        >
                            Unlink Discord
                        </Link>
                    )}
                    <div className="mt-4">
                        <Link
                            href={createTournament()}
                            className="bg-orange-200 p-2 hover:bg-orange-300"
                        >
                            Create Tournament
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}
