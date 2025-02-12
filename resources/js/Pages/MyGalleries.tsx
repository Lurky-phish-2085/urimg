import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData } from '@/types';

type MyGalleriesProps = {
    galleries: GalleryData[];
};

export default function MyGalleries({ galleries }: MyGalleriesProps) {
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
