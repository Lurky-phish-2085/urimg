import GalleryEditForm from '@/Components/GalleryEditForm';
import Image from '@/Components/Image';
import { GalleryData, ImageData, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Gallery({
    gallery,
    images,
    editMode,
    success,
}: PageProps<{
    gallery: GalleryData;
    images: ImageData[];
    editMode: boolean;
    success: string;
}>) {
    useEffect(() => {
        if (!success) return;
        alert(success);
    }, []);

    useEffect(() => {
        const removeListener = router.on('success', (e) => {
            const successMsg = e.detail.page.props.success;
            if (!successMsg) return;
            alert(successMsg);
        });

        return () => {
            removeListener();
        };
    }, [success]);

    return (
        <>
            <Head
                title={editMode ? 'Edit Gallery' : 'Gallery - ' + gallery.title}
            ></Head>
            <div className="flex flex-col gap-2 p-4">
                {editMode && <GalleryEditForm galleryData={gallery} />}
                {images.map((image) => (
                    <Image key={image.id} data={image} />
                ))}
            </div>
        </>
    );
}
