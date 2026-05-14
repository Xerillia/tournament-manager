import { Mode } from '@/enums';
import { Beatmap } from '@/types/beatmaps';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

interface MapPreviewerProps {
    beatmap: Beatmap;
}

export default function MapPreviewer({ beatmap }: MapPreviewerProps) {
    if (beatmap.mode !== Mode.STANDARD) return;

    const [showModal, setShowModal] = useState<boolean>(false);

    let mods = '';
    beatmap.mods.match(/.{2}/gi)?.forEach((mod) => {
        switch (mod) {
            case 'HD':
                mods += 'HD';
                break;
            case 'HR':
                mods += 'HR';
                break;
            case 'DT':
                mods += 'DT';
                break;
            case 'EZ':
                mods += 'EZ';
                break;
        }
    });

    return (
        <>
            <button
                type="button"
                className="cursor-pointer rounded-md bg-purple-200 px-2 py-1 hover:bg-purple-300"
                onClick={() => setShowModal(true)}
            >
                Preview
            </button>
            {showModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/80">
                    <div className="w-full max-w-350 rounded-lg bg-white">
                        <div className="relative flex flex-row items-center justify-center px-4">
                            <h1 className="flex-1 border-b px-4 py-3 text-xl font-bold">{`Preview for ${beatmap.beatmap_id} - ${beatmap.mods}`}</h1>
                            <button
                                className="absolute right-4 cursor-pointer rounded-md hover:bg-black/20"
                                onClick={() => setShowModal(false)}
                            >
                                <XIcon />
                            </button>
                        </div>

                        <iframe
                            className="aspect-video w-full"
                            src={`https://preview.tryz.id.vn/?b=${beatmap.beatmap_id}&m=${mods}`}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
