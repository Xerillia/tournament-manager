import CustomMapsTable from '@/components/xeril/custom-maps-table';
import SuggestionFooter from '@/components/xeril/suggestion-footer';
import { CustomMap } from '@/types/custommap';
import { Tournament } from '@/types/tournament';
import { Form } from '@inertiajs/react';

interface CustomMapsProps {
    tournament: Tournament;
    customMaps: CustomMap[];
}

export default function CustomMaps({ tournament, customMaps }: CustomMapsProps) {
    return (
        <div className="my-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold">Custom Maps</h1>
            <CustomMapsTable customMaps={customMaps} />
            <SuggestionFooter tournament={tournament} />
        </div>
    );
}
