import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Star, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommentsSection({ tournament, user, comments = [] }: any) {
    const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        content: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(`/tournaments/${tournament.id}/comments`, {
            onSuccess: () => reset(),
        });
    };

    const sortedComments = [...comments].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return (
        <div className="space-y-8">
            {/* Comment Form */}
            {user ? (
                <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase">
                        Leave a Review
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase">
                                Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        className="transition-colors"
                                    >
                                        <Star
                                            size={24}
                                            className={cn(
                                                data.rating >= star
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-slate-300 dark:text-slate-600'
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase">
                                Comment
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Share your thoughts about this tournament..."
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                            />
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {data.content.length} / 1000
                                </p>
                                {errors.content && (
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing || !data.content.trim()}
                            className="w-full px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Posting...' : 'Post Review'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sign in to leave a review
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                        Reviews ({comments.length})
                    </h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="text-xs px-2 py-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                        <option value="recent">Recent</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                {sortedComments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <p className="text-sm">No reviews yet. Be the first!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedComments.map((comment: any) => (
                            <div
                                key={comment.id}
                                className="border border-slate-200 dark:border-slate-800 p-4"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500"></div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-900 dark:text-white">
                                                {comment.author}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {user?.id === comment.user_id && (
                                        <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={14}
                                            className={cn(
                                                comment.rating >= star
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-slate-300 dark:text-slate-600'
                                            )}
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-slate-700 dark:text-slate-300">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
