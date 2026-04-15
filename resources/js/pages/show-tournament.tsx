import { Tournament } from '@/types/tournament';
import { Head } from '@inertiajs/react';

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
    return (
        <>
            <Head title={tournament.name} />
            <h1 className="text-4xl font-bold">Tournament Name: {tournament.name}</h1>
            {tournament.caption && <p>{tournament.caption}</p>}
            <p>Host: {tournament.host.username}</p>
            <p>Gamemode: {tournament.gamemode}</p>
            <p>
                Rank range: {tournament.max_rank} - {tournament.min_rank}
            </p>
            <p>
                Period: {tournament.start_datetime.toString()} - {tournament.end_datetime.toString()}
            </p>
            <p>Status: {tournament.status}</p>
            <p>Links:</p>
            {linkItems}
        </>
    );
}
