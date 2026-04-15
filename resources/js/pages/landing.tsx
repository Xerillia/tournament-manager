import SimpleAuth from '@/components/xeril/simple-auth';
import { Head, Link, usePage } from '@inertiajs/react';
import { Tournament } from '@/types/tournament';
import { destroy, edit, show } from '@/routes/tournaments';

interface LandingProps {
    tournaments: Tournament[];
    ownTournaments: Tournament[];
}

export default function Landing({ tournaments, ownTournaments }: LandingProps) {
    const { auth } = usePage().props;
    const tournamentItems = tournaments.map((tournament: Tournament) => (
        <Link
            href={show(tournament.id)}
            as="tr"
            key={tournament.id}
            className="hover:cursor-pointer hover:bg-black/5"
        >
            <td className="border p-2">{tournament.name}</td>
            <td className="border p-2">{tournament.host.username}</td>
            <td className="border p-2">{tournament.gamemode}</td>
            <td className="border p-2">
                {tournament.max_rank} - {tournament.min_rank}
            </td>
            <td className="border p-2">
                {tournament.start_datetime.toString()} - {tournament.end_datetime.toString()}
            </td>
            <td className="border p-2">{tournament.status}</td>
        </Link>
    ));
    const ownTournamentItems = ownTournaments.map((tournament: Tournament) => (
        <Link
            href={show(tournament.id)}
            as="tr"
            key={tournament.id}
            className="hover:cursor-pointer hover:bg-black/5"
        >
            <td className="border p-2">{tournament.name}</td>
            <td className="border p-2">{tournament.gamemode}</td>
            <td className="border p-2">
                {tournament.max_rank} - {tournament.min_rank}
            </td>
            <td className="border p-2">
                {tournament.start_datetime.toString()} - {tournament.end_datetime.toString()}
            </td>
            <td className="border p-2">{tournament.status}</td>
            <td className="border p-2 text-center">
                <Link
                    href={edit(tournament.id)}
                    className="mr-2 inline-block rounded-md bg-blue-200 p-2 hover:bg-blue-300"
                >
                    Edit
                </Link>
                <Link
                    href={destroy(tournament.id)}
                    method="delete"
                    className="rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-300"
                >
                    Delete
                </Link>
            </td>
        </Link>
    ));

    return (
        <>
            <Head title="Landing" />
            <SimpleAuth user={auth.user} />

            <h1 className="mt-12 text-3xl font-bold">Public Tournaments</h1>
            <table className="border-2">
                <thead>
                    <tr>
                        <th className="border p-4">Tournament Name</th>
                        <th className="border p-4">Host</th>
                        <th className="border p-4">Gamemode</th>
                        <th className="border p-4">Rank Range</th>
                        <th className="border p-4">Period</th>
                        <th className="border p-4">Status</th>
                    </tr>
                </thead>
                <tbody>{tournamentItems}</tbody>
            </table>
            {auth.user && ownTournaments.length > 0 && (
                <>
                    <h1 className="mt-12 text-3xl font-bold">Your Tournaments</h1>
                    <table className="border-2">
                        <thead>
                            <tr>
                                <th className="border p-4">Tournament Name</th>
                                <th className="border p-4">Gamemode</th>
                                <th className="border p-4">Rank Range</th>
                                <th className="border p-4">Period</th>
                                <th className="border p-4">Status</th>
                                <th className="border p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>{ownTournamentItems}</tbody>
                    </table>
                </>
            )}
        </>
    );
}
