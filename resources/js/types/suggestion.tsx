import { User } from './auth';
import { Beatmap } from './beatmaps';
import { Mappool } from './mappools';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

export type Suggestion = {
    id: number;
    mappool_id: number;
    mappool: Mappool;
    beatmap_id: number;
    beatmap: Beatmap;
    user: User;
    tags: string;
    notes: string;
};

const columnHelper = createColumnHelper<Suggestion>();

function secondToTime(num: number) {
    const m = Math.floor(num / 60)
            .toString()
            .padStart(2, '0'),
        s = Math.floor(num % 60)
            .toString()
            .padStart(2, '0');

    return m + ':' + s;
}

export const columns: ColumnDef<Suggestion>[] = [
    {
        accessorKey: 'beatmap.beatmap_id',
        header: 'Beatmap ID',
    },
    {
        accessorKey: 'beatmap.mods',
        header: 'Mods',
    },
    {
        accessorKey: 'user.username',
        header: 'Suggested By',
    },
    {
        accessorKey: 'comments',
        header: 'Comments',
    },
    columnHelper.display({
        id: 'cover',
        header: 'Cover',
        cell: (props) => <img src={'https://assets.ppy.sh/beatmaps/' + props.row.original.beatmap.beatmapset_id + '/covers/cover.jpg'} />,
        size: 250,
    }),
    {
        accessorFn: (row) => row.beatmap.star_rating.toFixed(2),
        header: 'SR',
        cell: (props) => `${props.getValue()} ★`,
    },
    {
        accessorFn: (row) => +row.beatmap.bpm.toFixed(2),
        header: 'BPM',
    },
    {
        accessorFn: (row) => +row.beatmap.cs.toFixed(2),
        header: 'CS',
    },
    {
        accessorFn: (row) => +row.beatmap.ar.toFixed(2),
        header: 'AR',
    },
    {
        accessorFn: (row) => +row.beatmap.od.toFixed(2),
        header: 'OD',
    },
    {
        accessorFn: (row) => secondToTime(row.beatmap.drain),
        header: 'Drain',
    },
    {
        accessorKey: 'beatmap.max_combo',
        header: 'Max Combo',
        cell: (props) => `${props.getValue()}x`,
    },
];
