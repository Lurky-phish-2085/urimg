import ContentList from '@/Components/ContentList';
import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps } from '@/types';

export default function Feed({
    galleries,
}: PageProps<{ galleries: GalleryData[] }>) {
    return (
        <AuthenticatedLayout>
            <UploadImageForm href={route('galleries.store')} />
            <ContentList galleries={galleries} />
        </AuthenticatedLayout>
    );
}
