import { login, logout } from '@/routes/osu';
import { Head, Link, usePage } from '@inertiajs/react';
import { link } from '@/routes/discord';

type User = {
    username: string;
    country_name: string;
    discord: string;
};
export default function Landing() {
    const { auth } = usePage<{
        auth: {
            user: User;
        };
    }>().props;

    return (
        <>
            <Head title="Landing" />
            {!auth.user && (
                <Link href={login()} className="bg-green-200 p-2">
                    Login Osu
                </Link>
            )}
            {auth.user && (
                <>
                    <div className="mb-4">
                        <p>
                            Logged in user:{' '}
                            <span className="font-bold">
                                {auth.user.username}
                            </span>
                        </p>
                        <p>
                            User Country:{' '}
                            <span className="font-bold">
                                {auth.user.country_name}
                            </span>
                        </p>
                        <p>
                            Linked Discord username:{' '}
                            <span className="font-bold">
                                {auth.user.discord}
                            </span>
                        </p>
                    </div>
                    <Link href={logout()} className="bg-red-200 p-2">
                        Logout
                    </Link>
                    {!auth.user.discord && (
                        <Link href={link()} className="bg-yellow-200 p-2">
                            Link Discord
                        </Link>
                    )}
                </>
            )}
        </>
    );
}
