import { Tournament } from '@/types/tournament';
import EditMappoolFormat from './edit-mappools-format';

interface PoolingProps {
    tournament: Tournament;
}

export default function Pooling({ tournament }: PoolingProps) {
    return (
        <div className="m-4">
            <h1 className="mb-8 text-4xl font-bold">{tournament.name} Pooling Panel</h1>
            <h2 className="mb-4 text-2xl font-bold">Mappool Format Setting</h2>
            <EditMappoolFormat mappools={tournament.mappools} />
        </div>
    );
}
