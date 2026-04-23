import { Download, X, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MappoolPreviewModal({ map, onClose }: any) {
    if (!map) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {map.title}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {map.artist} // {map.mapper}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Cover Image */}
                    <div className="bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center">
                        {map.cover ? (
                            <img
                                src={map.cover}
                                alt={map.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Music size={48} className="text-slate-400" />
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border border-slate-200 dark:border-slate-800 p-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                Difficulty
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {map.sr?.toFixed(2)}
                                <span className="text-xs text-slate-500 ml-1">★</span>
                            </p>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-800 p-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                CS
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {map.cs}
                            </p>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-800 p-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                AR
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {map.ar}
                            </p>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-800 p-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                BPM
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {map.bpm}
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                Length
                            </p>
                            <p className="text-sm text-slate-900 dark:text-white">
                                {Math.floor(map.length / 60)}:{(map.length % 60)
                                    .toString()
                                    .padStart(2, '0')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">
                                OD
                            </p>
                            <p className="text-sm text-slate-900 dark:text-white">
                                {map.od}
                            </p>
                        </div>
                    </div>

                    {/* Mod Compatibility (if applicable) */}
                    {map.mod && (
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-2">
                                Mod
                            </p>
                            <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-300 dark:border-indigo-700">
                                {map.mod}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <a
                            href={map.downloadUrl || '#'}
                            download
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                        >
                            <Download size={16} />
                            Direct Download
                        </a>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
