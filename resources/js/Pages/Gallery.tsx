import { Button } from '@/Components/ui/button';
import { Image, PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect } from 'react';

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
    const { setData, post, processing, errors } = useForm<{
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

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        setData('image', file);
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        post(route('images.store'));
    }

    return (
        <>
            <Head title={editMode ? 'Edit Gallery' : 'Gallery'}></Head>
            <div className="flex flex-col gap-2 p-4">
                {editMode && (
                    <div className="flex flex-col gap-2 p-2">
                        <h1>Edit Mode</h1>
                        <form onSubmit={submit}>
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
                                <Button type="submit">Upload</Button>
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
