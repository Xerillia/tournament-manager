import { WinConditionUtils } from '@/enums';
import { Slot } from '@/types/mappools';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

interface WinConditionProps {
    slot: Slot;
}

export default function WinCondition({ slot }: WinConditionProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <button
                type="button"
                className="cursor-pointer rounded-md bg-blue-200 hover:bg-blue-300"
                onClick={() => setShowModal(true)}
            >
                {WinConditionUtils.label(slot.win_condition)}
            </button>
            {showModal && (
                <Form method="POST">
                    <div
                        className="fixed inset-0 z-4 h-screen w-screen bg-black/20"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="absolute top-1/2 left-1/2 z-5 -translate-1/2 bg-white">
                        <h1 className="mx-4 mt-4 border-b-2 text-2xl font-semibold">Slot {slot.slot} Win Condition</h1>
                        <select
                            name="win_condition"
                            className="my-6 p-2 focus:outline-0"
                            defaultValue={slot.win_condition}
                        >
                            {WinConditionUtils.options().map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {WinConditionUtils.label(option)}
                                </option>
                            ))}
                        </select>
                        <div className="flex">
                            <button
                                type="submit"
                                className="flex-1 cursor-pointer bg-green-200 p-2 hover:bg-green-300"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="flex-1 cursor-pointer bg-red-200 p-2 hover:bg-red-300"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </>
    );
}
