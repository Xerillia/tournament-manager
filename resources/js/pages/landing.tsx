import { login, logout } from '@/routes/osu';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Landing() {
    const { auth } = usePage().props;

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
                    <div>Logged in user: {auth.user.username}</div>
                    <Link href={logout()} className="bg-red-200 p-2">
                        Logout
                    </Link>
                </>
            )}
        </>
    );
}
