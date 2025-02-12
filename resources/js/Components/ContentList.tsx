import { GalleryData } from '@/types';
import { Link } from '@inertiajs/react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

type ContentListProps = {
    galleries: GalleryData[];
};

export default function ContentList({ galleries }: ContentListProps) {
    return (
        <div className="flex flex-wrap items-start justify-center gap-4 md:justify-evenly">
            {galleries.map((gallery) => (
                <div
                    key={gallery.id}
                    className="block h-auto w-72 border border-base-200 p-4"
                >
                    <Link
                        method="get"
                        href={route('gallery', gallery.retrieval_id)}
                    >
                        <img
                            className="rounded-lg transition-all hover:scale-105 hover:opacity-80"
                            src={gallery.thumbnail_url}
                            alt={`${gallery.title || gallery.retrieval_id}'s gallery thumbnail image.`}
                            width={256}
                        />
                    </Link>
                    <div className="mt-4">
                        <Link
                            className="link-hover text-lg font-bold hover:link-secondary"
                            method="get"
                            href={route('gallery', gallery.retrieval_id)}
                        >
                            {gallery.title || gallery.retrieval_id}
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                            </div>
                            <Link
                                className="link-hover text-lg hover:link-secondary"
                                method="get"
                                href={route('gallery', gallery.retrieval_id)}
                            >
                                Username
                            </Link>
                            <div className="ml-auto flex gap-2">
                                <span>
                                    <AiOutlineLike /> 96
                                </span>
                                <span>
                                    <AiOutlineDislike /> 96
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
