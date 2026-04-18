import { Mode, ModeUtils } from '@/enums';
import { update } from '@/routes/tournaments';
import { Link, Tournament } from '@/types/tournament';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

interface EditTournamentProps {
    tournament: Tournament;
}

const MAX_ROW = 5; // for links

export default function EditTournament({ tournament }: EditTournamentProps) {
    const [links, setLinks] = useState<Link[]>(tournament.links);

    const [nextId, setNextId] = useState<number>(links.length === 0 ? 0 : Math.max(...links.map((obj) => obj.id)) + 1); // ensures id won't cause conflict locally

    function addLink() {
        setLinks([...links, { label: '', url: '', id: nextId }]);
        setNextId(nextId + 1);
    }

    function removeLink(link: Link) {
        setLinks(links.filter((obj) => obj.id !== link.id));
    }

    const linkIndex = (link: Link) => links.findIndex((obj) => obj.id === link.id); // find the index of the link

    const linkFilteredOut = (link: Link) => links.filter((obj) => obj.id !== link.id); // filter out the link from the list

    function insertLink(link: Link, newIndex = linkIndex(link)) {
        const filtered = linkFilteredOut(link);

        const newLinks = [
            ...filtered.slice(0, newIndex), // elements before insertion point
            link,
            ...filtered.slice(newIndex), // elements after insertion point
        ];

        setLinks(newLinks);
    }

    function move(link: Link, direction = 'up') {
        const index = linkIndex(link);

        let newIndex = -1;
        switch (direction) {
            case 'up':
                if (index !== 0) {
                    newIndex = index - 1;
                }
                break;
            case 'down':
                if (index !== links.length + 1) {
                    newIndex = index + 1;
                }
                break;
            default:
                break;
        }

        const otherLink = links.at(newIndex) as Link;
        [link.id, otherLink.id] = [otherLink.id, link.id];

        insertLink(link, newIndex);
    }

    function setLabel(newLabel: string, link: Link) {
        link.label = newLabel;

        insertLink(link);
    }

    function setUrl(newUrl: string, link: Link) {
        link.url = newUrl;

        insertLink(link);
    }

    return (
        <>
            <Head title="Edit Tournament" />
            <h1 className="text-4xl font-bold">Edit a Tournament</h1>
            <Form
                action={update(tournament.id)}
                method="PUT"
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
                            id="name"
                            className="rounded-md border border-slate-800 p-2"
                            placeholder="Awesome Osu Tournament"
                            required
                            onBlur={() => validate('name')}
                            defaultValue={tournament.name}
                            autoComplete="false"
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
                            id="caption"
                            className="rounded-md border border-slate-800 p-2"
                            placeholder="Ready to show your might?"
                            onBlur={() => validate('caption')}
                            defaultValue={tournament.caption}
                        />
                        {invalid('caption') && <p className="text-red-600">{errors.caption}</p>}

                        <label
                            htmlFor="mode"
                            className="mt-4 text-lg font-bold"
                        >
                            Mode<span className="text-red-600">*</span>
                        </label>
                        <select
                            name="mode"
                            id="mode"
                            className="rounded-md border border-slate-800 p-2"
                            defaultValue={tournament.mode}
                            required
                            onBlur={() => validate('mode')}
                        >
                            <option value={Mode.STANDARD}>{ModeUtils.label(Mode.STANDARD)}</option>
                            <option value={Mode.MANIA}>{ModeUtils.label(Mode.MANIA)}</option>
                            <option value={Mode.TAIKO}>{ModeUtils.label(Mode.TAIKO)}</option>
                            <option value={Mode.CATCH}>{ModeUtils.label(Mode.CATCH)}</option>
                        </select>
                        {invalid('mode') && <p className="text-red-600">{errors.mode}</p>}

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
                                    id="max_rank"
                                    className="rounded-md border border-slate-800 p-2"
                                    placeholder="10000"
                                    required
                                    onBlur={() => validate('max_rank')}
                                    defaultValue={tournament.max_rank}
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
                                    id="min_rank"
                                    min={1}
                                    className="rounded-md border border-slate-800 p-2"
                                    placeholder="100000"
                                    required
                                    onBlur={() => validate('min_rank')}
                                    defaultValue={tournament.min_rank}
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
                                    id="start_datetime"
                                    className="rounded-md border border-slate-800 p-2"
                                    required
                                    onBlur={() => validate('start_datetime')}
                                    defaultValue={tournament.start_datetime.toString()}
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
                                    id="end_datetime"
                                    className="rounded-md border border-slate-800 p-2"
                                    required
                                    onBlur={() => validate('end_datetime')}
                                    defaultValue={tournament.end_datetime.toString()}
                                />
                                {invalid('end_datetime') && <p className="text-red-600">{errors.end_datetime}</p>}
                            </div>
                        </div>

                        <p className="mt-4 text-lg font-bold">Links</p>
                        {links.map((link) => (
                            <div
                                key={link.id}
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
                                            value={link.label}
                                            onChange={(e) => setLabel(e.target.value, link)}
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
                                            value={link.url}
                                            onChange={(e) => setUrl(e.target.value, link)}
                                        />
                                        {invalid('links.' + link.id + '.url') && <p className="text-red-600">{errors['links.' + link.id + '.url']}</p>}
                                    </div>
                                </div>
                                {links.length >= 2 && (
                                    <div className="flex gap-2 place-self-end">
                                        {link !== links.at(0) && (
                                            <button
                                                type="button"
                                                className="aspect-square h-10 rounded-md bg-gray-200 p-2 hover:cursor-pointer hover:bg-gray-300"
                                                onClick={() => move(link, 'up')}
                                            >
                                                Up
                                            </button>
                                        )}
                                        {link !== links.at(-1) && (
                                            <button
                                                type="button"
                                                className="aspect-square h-10 rounded-md bg-gray-200 p-2 hover:cursor-pointer hover:bg-gray-300"
                                                onClick={() => move(link, 'down')}
                                            >
                                                Down
                                            </button>
                                        )}
                                    </div>
                                )}
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
                            {processing ? 'Editing...' : 'Edit'}
                        </button>
                    </>
                )}
            </Form>
        </>
    );
}
