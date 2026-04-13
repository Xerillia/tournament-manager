// resources/js/Pages/Admin/Tournament.jsx

import { router } from '@inertiajs/react'
import { useState } from 'react'
import { Layout } from '@/pages/admin';
import type { User } from '@/types/auth';
import type { Tournament } from '@/types/tournament';




interface Props {
    tournament: Tournament;
    players: User[];
}

export default function Players({ tournament, players }: Props) {
    console.log(players)
    console.log(players[0])
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
                                    <th className="px-6 py-3">Osu ID</th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">Discord</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-800">
                                {players.map((player) => (
                                    <tr key={player.id} className="hover:bg-zinc-800/50 transition">
                                        <td className="px-6 py-4 text-zinc-300">
                                            {player.id}
                                        </td>

                                        <td className="px-6 py-4 text-white font-medium">
                                            {player.username}
                                        </td>

                                        <td className="px-6 py-4 text-zinc-300">
                                            {player.discord}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="hover:bg-zinc-800/50 transition">
                                    <td className="px-6 py-4 text-zinc-300">123456</td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        Maria Anders
                                    </td>
                                    <td className="px-6 py-4 text-zinc-300">
                                        Germany
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
