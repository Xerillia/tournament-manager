// resources/js/Pages/Admin/Tournament.jsx

import { router } from '@inertiajs/react'
import { useState } from 'react'

import { Layout } from '@/pages/admin';

export default function Admin() {
    return (
        <Layout>
            <div className="flex-1 max-w-5xl mx-5 py-10 px-4">
                <h1 className="text-2xl font-medium mb-6">Tournament admin</h1>

                <div className="flex border-b mb-6"></div>
                <div className="mb-4"></div>
            </div>
        </Layout>
    )
}
