import { Image, PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChangeEvent, useEffect } from 'react';

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
    const { data, post, processing, errors } = useForm<{
        galleryId: string;
        image?: Blob | null;
    }>({
        galleryId: galleryId,
        image: null,
    });

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

    function submit() {
        post(route('images.store'));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        data.image = file;
        submit();
    }

    return (
        <>
            <Head title={editMode ? 'Edit Gallery' : 'Gallery'}></Head>
            <div className="flex flex-col gap-2 p-4">
                {editMode && (
                    <div className="flex flex-col gap-2 p-2">
                        <h1>Edit Mode</h1>
                        <form>
                            <h1>Upload Image</h1>
                            <input
                                type="file"
                                accept="image/*"
                                disabled={processing}
                                onChange={handleChange}
                            />
                            <div>
                                <small className="text-red-500">
                                    {errors.image}
                                </small>
                            </div>
                        </form>
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
