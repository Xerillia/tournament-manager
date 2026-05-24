import CustomMapsTable from '@/components/xeril/custom-maps-table';
import SuggestionFooter from '@/components/xeril/suggestion-footer';
import { CustomMap } from '@/types/custommap';
import { Mappool } from '@/types/mappools';
import { Tournament } from '@/types/tournament';

interface CustomMapsProps {
    tournament: Tournament;
    mappools: Mappool[];
    customMaps: CustomMap[];
}

export default function CustomMaps({ tournament, mappools, customMaps }: CustomMapsProps) {
    return (
        <div className="my-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold">Custom Maps</h1>
            <CustomMapsTable
                tournament={tournament}
                mappools={mappools}
                customMaps={customMaps}
            />
            <SuggestionFooter tournament={tournament} />
        </div>
    );
}
