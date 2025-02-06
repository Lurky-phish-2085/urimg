import Authenticated from '@/Layouts/AuthenticatedLayout';
import { BookmarkData, PageProps } from '@/types';

export default function Bookmarks({
    bookmarks,
}: PageProps<{ bookmarks: BookmarkData[] }>) {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Bookmarks
                </h2>
            }
        >
            {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                    <a
                        key={bookmark.id}
                        className="my-2 block text-blue-500 underline"
                        href={route('gallery', bookmark.content_retrieval_id)}
                        target="_noblank"
                        rel="noopenner noreferrer"
                    >
                        {bookmark.content_retrieval_id}
                    </a>
                ))
            ) : (
                <h1 className="text-2xl">NOTHING TO SHOW HERE...</h1>
            )}
        </Authenticated>
    );
}
