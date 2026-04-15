// resources/js/Pages/Admin/Tournament.jsx

import { router } from '@inertiajs/react'
import { useState } from 'react'
import { Layout } from '@/pages/admin/admin';
import type { User } from '@/types/auth';
import type { Tournament } from '@/types/tournament';


type TeamsProp = {
    id: number;
    name: string;
    users: User[]
}

interface Props {
    tournament: Tournament;
    teams: TeamsProp[];
}

export default function Players({ tournament, teams }: Props) {

    return (
        <Layout tournament={tournament}>
            <div className="flex-1 max-w-6xl mx-auto px-6 py-10">

                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Tournament Admin
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Manage players and tournament settings

                    </p>
                </div>

                {/* Table card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden">

                    {/* Table header */}
                    <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-800/50">
                        <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wide">
                            Players
                        </h2>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">

                            <thead className="text-zinc-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Team Id</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Members</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-800">
                                {teams.map((team) => (
                                    <tr key={team.id} className="hover:bg-zinc-800/50 transition">
                                        <td className="px-6 py-4 text-zinc-300">
                                            {team.id}
                                        </td>

                                        <td className="px-6 py-4 text-white font-medium">
                                            {team.name}
                                        </td>

                                        <td className="px-6 py-4 text-zinc-300">
                                            {team.users[0].username}
                                            {team.users.slice(1).map((user) => (
                                                ", " + user.username
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
