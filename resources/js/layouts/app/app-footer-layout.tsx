import { Link } from '@inertiajs/react';

interface FooterProps {
    className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`mt-20 border-t border-stone-800 bg-[#0F0E0E] py-12 font-['Plus_Jakarta_Sans',_sans-serif] ${className}`}
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
                    {/* Brand & Legal Summary */}
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="group text-2xl font-black tracking-tighter text-stone-200"
                        >
                            FISH
                            <span className="text-pink-500 transition-colors group-hover:text-pink-400">
                                .
                            </span>
                        </Link>
                        <div className="mt-3 space-y-1">
                            <p className="text-sm font-bold text-stone-500">
                                © {currentYear} osu!catch Strategy Festival.
                            </p>
                            <p className="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">
                                Not affiliated with ppy Pty Ltd.
                            </p>
                        </div>
                    </div>

                    {/* Small Legal Links */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-black tracking-widest text-stone-400 uppercase">
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-pink-500"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-pink-500"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/contact"
                            className="transition-colors hover:text-pink-500"
                        >
                            Contact Support
                        </Link>
                    </div>

                    {/* Social Connect */}
                    <div className="flex items-center gap-3">
                        <span className="hidden text-[10px] font-bold tracking-widest text-stone-500 uppercase lg:block">
                            Connect with us
                        </span>
                        <div className="flex gap-2">
                            <a
                                href="https://discord.gg/yourlink"
                                target="_blank"
                                className="rounded-xl bg-stone-900 p-2.5 text-stone-400 transition-all hover:bg-[#5865F2] hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                                aria-label="Discord"
                            >
                                <svg
                                    className="size-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitch.tv/yourlink"
                                target="_blank"
                                className="rounded-xl bg-stone-900 p-2.5 text-stone-400 transition-all hover:bg-[#9146FF] hover:text-white hover:shadow-lg hover:shadow-purple-500/20"
                                aria-label="Twitch"
                            >
                                <svg
                                    className="size-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Micro credit */}
                <div className="mt-12 border-t border-stone-800 pt-8 text-center">
                    <p className="text-[9px] font-black tracking-[0.3em] text-stone-500 uppercase">
                        Built for the community with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
}
