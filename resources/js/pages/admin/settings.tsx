// resources/js/Pages/Admin/Tournament.jsx

import { router } from '@inertiajs/react'
import { useState } from 'react'
import { Layout } from '@/pages/admin/admin';
import type { Tournament } from '@/types/tournament';



interface Props {
    tournament: Tournament;
}

export default function settings({ tournament }: Props) {

    return (
        <Layout tournament={tournament}>
            <div className="flex-1 max-w-6xl mx-auto px-6 py-10">

                {/* Page title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Tournament Admin
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Manage tournament settings
                    </p>
                </div>
                {/* Seems like some settings are missing from a database and might need to be change later on or this page can potentially be replaced by /edit or vice versa */}
            </div>
        </Layout>
    )
}
