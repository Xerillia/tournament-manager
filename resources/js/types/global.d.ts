import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
            flash: {
                beatmap_not_found?: string;
            };
        };
    }
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        tooltip?: string;
    }
}
