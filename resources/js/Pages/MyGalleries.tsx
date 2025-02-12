import ContentList from '@/Components/ContentList';
import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData } from '@/types';

type MyGalleriesProps = {
    galleries: GalleryData[];
};

export default function MyGalleries({ galleries }: MyGalleriesProps) {
    return (
        <AuthenticatedLayout className="mb-32">
            <UploadImageForm href={route('galleries.store')} />
            <ContentList galleries={galleries} />
        </AuthenticatedLayout>
    );
}
