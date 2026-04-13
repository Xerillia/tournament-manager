import { store } from '@/routes/tournaments';
import { Link } from '@/types/tournament';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

const MAX_ROW = 5;

export default function CreateTournament() {
    const [links, setLinks] = useState<Link[]>([]);

    const [nextId, setNextId] = useState<number>(0);

    function addLink() {
        setLinks([...links, { label: '', url: '', sequence: nextId + 1, id: nextId }]);
        setNextId(nextId + 1);
    }

    function removeLink(link: Link) {
        setLinks(links.filter((obj) => obj.id !== link.id));
    }

    return (
        <>
            <Head title="Create Tournament" />
            <h1 className="text-4xl font-bold">Create a Tournament</h1>
            <Form
                action={store()}
                method="POST"
                className="m-4 flex flex-col"
                disableWhileProcessing
            >
                {({ errors, invalid, validate, processing }) => (
                    <>
                        <p className="mb-2">
                            <span className="text-red-600">*</span> fields are required
                        </p>

                        <label
                            htmlFor="name"
                            className="text-lg font-bold"
                        >
                            Tournament Name
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="rounded-md border border-slate-800 p-2"
                            placeholder="Awesome Osu Tournament"
                            required
                            onChange={() => validate('name')}
                        />
                        {invalid('name') && <p className="text-red-600">{errors.name}</p>}

                        <label
                            htmlFor="caption"
                            className="mt-4 text-lg font-bold"
                        >
                            Tournament Caption
                            <span className="ml-1 text-sm text-gray-500">(optional, 255 characters max)</span>
                        </label>
                        <input
                            type="text"
                            name="caption"
                            className="rounded-md border border-slate-800 p-2"
                            placeholder="Ready to show your might?"
                            onChange={() => validate('caption')}
                        />
                        {invalid('caption') && <p className="text-red-600">{errors.caption}</p>}

                        <label
                            htmlFor="gamemode"
                            className="mt-4 text-lg font-bold"
                        >
                            Gamemode<span className="text-red-600">*</span>
                        </label>
                        <select
                            name="gamemode"
                            className="rounded-md border border-slate-800 p-2"
                            defaultValue="std"
                            required
                            onChange={() => validate('gamemode')}
                        >
                            <option value="std">Standard</option>
                            <option value="mania">Mania</option>
                            <option value="taiko">Taiko</option>
                            <option value="ctb">Catch the Beat</option>
                        </select>
                        {invalid('gamemode') && <p className="text-red-600">{errors.gamemode}</p>}

                        <div className="flex gap-4">
                            <div className="flex flex-1 flex-col">
                                <label
                                    htmlFor="max_rank"
                                    className="mt-4 text-lg font-bold"
                                >
                                    Maximum Rank
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="max_rank"
                                    className="rounded-md border border-slate-800 p-2"
                                    placeholder="10000"
                                    required
                                    onChange={() => validate('max_rank')}
                                />
                                {invalid('max_rank') && <p className="text-red-600">{errors.max_rank}</p>}
                            </div>

                            <div className="flex flex-1 flex-col">
                                <label
                                    htmlFor="min_rank"
                                    className="mt-4 text-lg font-bold"
                                >
                                    Minimum Rank
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="min_rank"
                                    min={1}
                                    className="rounded-md border border-slate-800 p-2"
                                    placeholder="100000"
                                    required
                                    onChange={() => validate('min_rank')}
                                />
                                {invalid('min_rank') && <p className="text-red-600">{errors.min_rank}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-1 flex-col">
                                <label
                                    htmlFor="start_datetime"
                                    className="mt-4 text-lg font-bold"
                                >
                                    Start Date
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_datetime"
                                    className="rounded-md border border-slate-800 p-2"
                                    required
                                    onChange={() => validate('start_datetime')}
                                />
                                {invalid('start_datetime') && <p className="text-red-600">{errors.start_datetime}</p>}
                            </div>

                            <div className="flex flex-1 flex-col">
                                <label
                                    htmlFor="end_datetime"
                                    className="mt-4 text-lg font-bold"
                                >
                                    End Date
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_datetime"
                                    className="rounded-md border border-slate-800 p-2"
                                    required
                                    onChange={() => validate('end_datetime')}
                                />
                                {invalid('end_datetime') && <p className="text-red-600">{errors.end_datetime}</p>}
                            </div>
                        </div>

                        <p className="mt-4 text-lg font-bold">Links</p>
                        {links.map((link) => (
                            <div
                                key={link.id}
                                id="links"
                                className="mb-4 flex gap-2"
                            >
                                {links.length >= 2 && (
                                    <button
                                        type="button"
                                        className="aspect-square h-10 place-self-end rounded-md bg-red-200 p-2 hover:cursor-pointer hover:bg-red-300"
                                        onClick={() => removeLink(link)}
                                    >
                                        Del
                                    </button>
                                )}
                                <div className="flex flex-1 gap-4">
                                    <div className="flex-1">
                                        <label htmlFor={'links[' + link.id + '][label]'}>Label</label>
                                        <input
                                            type="text"
                                            name={'links[' + link.id + '][label]'}
                                            id={'links[' + link.id + '][label]'}
                                            className="block w-full rounded-md border border-slate-800 p-2"
                                            required
                                            onBlur={() => validate('links.' + link.id + '.label')}
                                            defaultValue={links.find((obj) => obj.id === link.id)?.label}
                                        />
                                        {invalid('links.' + link.id + '.label') && <p className="text-red-600">{errors['links.' + link.id + '.label']}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor={'links[' + link.id + '][url]'}>URL</label>
                                        <input
                                            type="text"
                                            name={'links[' + link.id + '][url]'}
                                            id={'links[' + link.id + '][url]'}
                                            className="flex w-full flex-1 rounded-md border border-slate-800 p-2"
                                            required
                                            onBlur={() => validate('links.' + link.id + '.url')}
                                            defaultValue={links.find((obj) => obj.id === link.id)?.url}
                                        />
                                        {invalid('links.' + link.id + '.url') && <p className="text-red-600">{errors['links.' + link.id + '.url']}</p>}
                                    </div>
                                </div>
                                {/* {links.length >= 2 && (
                                    <div className="flex gap-2 place-self-end">
                                        <button
                                            type="button"
                                            className="aspect-square h-10 rounded-md bg-gray-200 p-2 hover:cursor-pointer hover:bg-gray-300"
                                            disabled={link.sequence === 1}
                                        >
                                            Up
                                        </button>
                                        <button
                                            type="button"
                                            className="aspect-square h-10 rounded-md bg-gray-200 p-2 hover:cursor-pointer hover:bg-gray-300"
                                            disabled={link.sequence === MAX_ROW}
                                        >
                                            Down
                                        </button>
                                    </div>
                                )} */}
                                <input
                                    type="hidden"
                                    name={'links[' + link.id + '][sequence]'}
                                    id={'links[' + link.id + '][sequence]'}
                                    value={links.find((obj) => obj.id === link.id)?.id}
                                />
                            </div>
                        ))}
                        {links.length < MAX_ROW && (
                            <button
                                type="button"
                                className="block aspect-square w-8 rounded-md bg-green-200 hover:cursor-pointer hover:bg-green-300"
                                onClick={() => addLink()}
                            >
                                +
                            </button>
                        )}

                        <button
                            type="submit"
                            className="mt-4 w-fit rounded-sm bg-green-200 p-2 hover:cursor-pointer hover:bg-green-300"
                            disabled={processing}
                        >
                            {processing ? 'Creating...' : 'Create'}
                        </button>
                    </>
                )}
            </Form>
        </>
    );
}
