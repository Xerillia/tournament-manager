// resources/js/Pages/Admin/Tournament.jsx
import type { Tournament } from '@/types/tournament';

interface Props {
    tournament: Tournament;
}

export default function Admin({ tournament }: Props) {

    return (
        <Layout tournament={tournament}>
            <div className="flex-1 max-w-5xl mx-5 py-10 px-4">
                <h1 className="text-2xl font-medium mb-6">Tournament admin panel</h1>
                
                <div className="flex border-b mb-6"></div>
                <div className="mb-4">
                    <p>{tournament.name}</p>
                    <p>{tournament.id}</p>
                </div>
            </div>
        </Layout>
    )
}

export function AdminSidebar({ className = "", tournament }: { className?: string; tournament: Tournament}) {
    return (
        <div className={`w-64 bg-zinc-800 min-h-screen flex flex-col p-4 gap-2 ${className}`}>
            {/* Maybe update hrefs to ude laravels built in routing names. */}
            <a href={`/tournaments/${tournament.id}/admin`} className="text-white hover:text-orange-400">Dashboard</a>
            <a href={`/tournaments/${tournament.id}/admin/settings`} className="text-white hover:text-orange-400">Settings</a>
            <a href={`/tournaments/${tournament.id}/admin/players`} className="text-white hover:text-orange-400">Players</a>
            <a href={`/tournaments/${tournament.id}/admin/teams`}  className="text-white hover:text-orange-400">Teams</a>
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

export function Layout(
    { children, tournament }: { children: React.ReactNode; tournament: Tournament }
) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <AdminSidebar tournament={tournament}/>

                <main className="flex-1 bg-zinc-900">
                    {children}
                </main>
            </div>
        </div>
    )
}