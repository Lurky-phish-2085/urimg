import Authenticated from '@/Layouts/AuthenticatedLayout';
import { BookmarkData, PageProps } from '@/types';

export default function Bookmarks({
    bookmarks,
}: PageProps<{ bookmarks: BookmarkData[] }>) {
    return (
        <Authenticated pageTitle="Bookmarks">
            {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                    <a
                        key={bookmark.id}
                        className="my-2 block text-blue-500 underline"
                        href={route('gallery', bookmark.content_retrieval_id)}
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
