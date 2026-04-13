// resources/js/Pages/Admin/Tournament.jsx

import { router } from '@inertiajs/react'
import { useState } from 'react'

export default function Admin() {
    return (
        <Layout>
            <div className="flex-1 max-w-5xl mx-5 py-10 px-4">
                <h1 className="text-2xl font-medium mb-6">Tournament admin</h1>

                {/* Tabs */}
                <div className="flex border-b mb-6"></div>

                {/* Search */}
                <div className="mb-4"></div>
            </div>
        </Layout>
    )
}

export function AdminSidebar({ className = "" }: { className?: string }) {
    return (
        <div className={`w-64 bg-zinc-800 min-h-screen flex flex-col p-4 gap-2 ${className}`}>
            <a className="text-white hover:text-orange-400">Dashboard</a>
            <a className="text-white hover:text-orange-400">Players</a>
            <a className="text-white hover:text-orange-400">Teams</a>
        </div>
    )
}

export function Header({ className = "" }: { className?: string }) {
    return (
        <header className={`bg-zinc-700 h-10 flex items-center w-full border-b border-orange-300 px-4 ${className}`}>
            <a className="font-bold text-xl text-white" href="/">Home</a>
        </header>
    )
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <AdminSidebar />

                <main className="flex-1 bg-zinc-900">
                    {children}
                </main>
            </div>
        </div>
    )
}