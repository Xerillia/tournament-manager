import SimpleAuth from '@/components/xeril/simple-auth';
import { Head, usePage } from '@inertiajs/react';
import { Tournament } from '@/types/tournament';

interface LandingProps {
    tournaments: Tournament[];
    ownTournaments: Tournament[];
}

export default function Landing({ tournaments, ownTournaments }: LandingProps) {
    const { auth } = usePage().props;
    const tournamentItems = tournaments.map((tournament: Tournament) => (
        <tr key={tournament.id}>
            <td className="border p-2">{tournament.name}</td>
            <td className="border p-2">{tournament.host.username}</td>
            <td className="border p-2">{tournament.gamemode}</td>
            <td className="border p-2">
                {tournament.max_rank} - {tournament.min_rank}
            </td>
            <td className="border p-2">
                {tournament.start_datetime.toString()} -{' '}
                {tournament.end_datetime.toString()}
            </td>
            <td className="border p-2">{tournament.status}</td>
            <td className="border p-2">{tournament.forum_post}</td>
        </tr>
    ));
    const ownTournamentItems = ownTournaments.map((tournament: Tournament) => (
        <tr key={tournament.id}>
            <td className="border p-2">{tournament.name}</td>
            <td className="border p-2">{tournament.gamemode}</td>
            <td className="border p-2">
                {tournament.max_rank} - {tournament.min_rank}
            </td>
            <td className="border p-2">
                {tournament.start_datetime.toString()} -{' '}
                {tournament.end_datetime.toString()}
            </td>
            <td className="border p-2">{tournament.status}</td>
            <td className="border p-2">{tournament.forum_post}</td>
        </tr>
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
                        <th className="border p-4">Forum Post</th>
                    </tr>
                </thead>
                <tbody>{tournamentItems}</tbody>
            </table>
            {auth.user && ownTournaments.length > 0 && (
                <>
                    <h1 className="mt-12 text-3xl font-bold">
                        Your Tournaments
                    </h1>
                    <table className="border-2">
                        <thead>
                            <tr>
                                <th className="border p-4">Tournament Name</th>
                                <th className="border p-4">Gamemode</th>
                                <th className="border p-4">Rank Range</th>
                                <th className="border p-4">Period</th>
                                <th className="border p-4">Status</th>
                                <th className="border p-4">Forum Post</th>
                            </tr>
                        </thead>
                        <tbody>{ownTournamentItems}</tbody>
                    </table>
                </>
            )}
        </>
    );
}
