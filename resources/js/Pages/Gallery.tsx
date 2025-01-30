import UploadImageForm from '@/Components/UploadImageForm';
import { Image, PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Gallery({
    galleryId,
    images,
    editMode,
    success,
}: PageProps<{
    galleryId: string;
    images: Image[];
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
            <Head title={editMode ? 'Edit Gallery' : 'Gallery'}></Head>
            <div className="flex flex-col gap-2 p-4">
                {editMode && (
                    <div className="flex flex-col gap-2 p-2">
                        <h1>Edit Mode</h1>
                        <UploadImageForm
                            href={route('images.store')}
                            galleryId={galleryId}
                        />
                        <Link
                            method="delete"
                            href={route('galleries.destroy', galleryId)}
                        >
                            Delete
                        </Link>
                    </div>
                )}
                {images.map((image) => (
                    <img key={image.id} src={image.image_url} width={256} />
                ))}
            </div>
        </>
    );
}
