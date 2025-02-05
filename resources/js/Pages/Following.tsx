import { GalleryData, PageProps } from '@/types';

export default function Following({
    galleries,
}: PageProps<{ galleries: GalleryData[] }>) {
    return (
        <>
            {galleries.length > 0 ? (
                galleries.map((gallery) => (
                    <a
                        key={gallery.id}
                        className="my-2 block text-blue-500 underline"
                        href={route('gallery', gallery.retrieval_id)}
                        target="_noblank"
                        rel="noopenner noreferrer"
                    >
                        {gallery.title || gallery.retrieval_id}
                    </a>
                ))
            ) : (
                <h2 className="text-lg">Nothing's here...</h2>
            )}
        </>
    );
}
