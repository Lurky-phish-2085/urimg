import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData } from '@/types';

type MyGalleriesProps = {
    galleries: GalleryData[];
};

export default function MyGalleries({ galleries }: MyGalleriesProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Galleries
                </h2>
            }
        >
            <UploadImageForm href={route('galleries.store')} />
            {galleries.map((gallery) => (
                <a
                    key={gallery.id}
                    className="my-2 block text-blue-500 underline"
                    href={route('gallery', gallery.retrieval_id)}
                    target="_noblank"
                    rel="noopenner noreferrer"
                >
                    {gallery.title || gallery.retrieval_id}
                </a>
            ))}
        </AuthenticatedLayout>
    );
}
