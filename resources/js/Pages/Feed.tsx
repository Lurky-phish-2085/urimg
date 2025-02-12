import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps } from '@/types';

export default function Feed({
    galleries,
}: PageProps<{ galleries: GalleryData[] }>) {
    return (
        <AuthenticatedLayout>
            <UploadImageForm href={route('galleries.store')} />
            {galleries.map((gallery) => (
                <a
                    key={gallery.id}
                    className="my-2 block text-blue-500 underline"
                    href={route('gallery', gallery.retrieval_id)}
                >
                    {gallery.title || gallery.retrieval_id}
                </a>
            ))}
        </AuthenticatedLayout>
    );
}
