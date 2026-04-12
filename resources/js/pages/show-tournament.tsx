import { Tournament } from '@/types/tournament';
import { Head } from '@inertiajs/react';

interface ShowTournamentProps {
    tournament: Tournament;
}
export default function ShowTournament({ tournament }: ShowTournamentProps) {
    return (
        <>
            <Head title={tournament.name} />
            <h1 className="text-4xl font-bold">
                Tournament Name: {tournament.name}
            </h1>
            {tournament.caption && <p>{tournament.caption}</p>}
            <p>Host: {tournament.host.username}</p>
            <p>Gamemode: {tournament.gamemode}</p>
            <p>
                Rank range: {tournament.max_rank} - {tournament.min_rank}
            </p>
            <p>
                Period: {tournament.start_datetime.toString()} -{' '}
                {tournament.end_datetime.toString()}
            </p>
            <p>Status: {tournament.status}</p>
            <p>
                Forum Post:{' '}
                <a
                    href={tournament.forum_post}
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                    target="_blank"
                >
                    {tournament.forum_post}
                </a>
            </p>
        </>
    );
}
