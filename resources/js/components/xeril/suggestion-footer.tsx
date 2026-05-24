import { showPoolingPanel } from '@/routes/tournaments/mappools';
import { Tournament } from '@/types/tournament';
import { Link } from '@inertiajs/react';

interface SuggestionFooterProps {
    tournament: Tournament;
    current_id: number;
}

export default function SuggestionFooter({ tournament, current_id }: SuggestionFooterProps) {
    return (
        <div className="fixed bottom-0 z-2 flex h-16 w-full items-center justify-center bg-gray-300">
            <Link className="flex h-full items-center px-2 text-xl font-semibold hover:bg-gray-400">Custom Maps</Link>
            {tournament.mappools.map((mappool) =>
                mappool.id === current_id ? (
                    <div
                        key={mappool.id}
                        className="flex h-full items-center bg-gray-500 px-2 text-xl font-semibold text-white"
                    >
                        {mappool.round}
                    </div>
                ) : (
                    <Link
                        key={mappool.id}
                        href={showPoolingPanel([tournament, mappool])}
                        className="flex h-full items-center px-2 text-xl font-semibold hover:bg-gray-400"
                    >
                        {mappool.round}
                    </Link>
                ),
            )}
        </div>
    );
}
