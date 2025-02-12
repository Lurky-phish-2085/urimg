import ContentList from '@/Components/ContentList';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps } from '@/types';

export default function Following({
    galleries,
}: PageProps<{ galleries: GalleryData[] }>) {
    return (
        <>
            <Authenticated>
                {galleries.length > 0 ? (
                    <ContentList galleries={galleries} />
                ) : (
                    <h2 className="text-lg">Nothing's here...</h2>
                )}
            </Authenticated>
        </>
    );
}
