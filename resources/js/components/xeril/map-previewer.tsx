import { XIcon } from 'lucide-react';
import { useState } from 'react';

interface MapPreviewerProps {
    beatmap_id: number;
    mods: string;
}

export default function MapPreviewer({ beatmap_id, mods }: MapPreviewerProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    let validMods = '';
    mods.match(/.{2}/gi)?.forEach((mod) => {
        switch (mod) {
            case 'HD':
                validMods += 'HD';
                break;
            case 'HR':
                validMods += 'HR';
                break;
            case 'DT':
                validMods += 'DT';
                break;
            case 'EZ':
                validMods += 'EZ';
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
                            <h1 className="flex-1 border-b px-4 py-3 text-xl font-bold">{`Preview for ${beatmap_id} - ${mods}`}</h1>
                            <button
                                className="absolute right-4 cursor-pointer rounded-md hover:bg-black/20"
                                onClick={() => setShowModal(false)}
                            >
                                <XIcon />
                            </button>
                        </div>

                        <iframe
                            className="aspect-video w-full"
                            src={`https://preview.tryz.id.vn/?b=${beatmap_id}&m=${validMods}`}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
