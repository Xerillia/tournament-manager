import { showPoolingPanel } from '@/routes/tournaments/mappools';
import { Tournament } from '@/types/tournament';
import { Head, Link } from '@inertiajs/react';

interface ShowTournamentProps {
    tournament: Tournament;
}
export default function ShowTournament({ tournament }: ShowTournamentProps) {
    const linkItems = tournament.links.map((link) => (
        <a
            key={link.id}
            href={link.url}
            target="_blank"
            className="block w-fit text-blue-500 hover:text-blue-700 hover:underline"
        >
            {link.label} - {link.url}
        </a>
    ));

    const mappools = tournament.mappools.map((mappool) => (
        <Link
            key={mappool.id}
            href={showPoolingPanel([tournament, mappool])}
            className="rounded-md bg-purple-300 p-2 hover:cursor-pointer hover:bg-purple-200"
        >
            {mappool.round}
        </Link>
    ));
    return (
        <>
            <Head title={tournament.name} />
            <h1 className="text-4xl font-bold">Tournament Name: {tournament.name}</h1>
            {tournament.caption && <p>{tournament.caption}</p>}
            <p>Host: {tournament.host.username}</p>
            <p>Mode: {tournament.mode}</p>
            <p>
                Rank range: {tournament.max_rank} - {tournament.min_rank}
            </p>
            <p>
                Period: {tournament.start_datetime.toString()} - {tournament.end_datetime.toString()}
            </p>
            <p>Status: {tournament.status}</p>
            <p>Links:</p>
            {linkItems}

            <div className="mt-2 flex gap-2">{mappools}</div>
        </>
    );
}
