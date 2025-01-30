import { useForm } from '@inertiajs/react';
import { ChangeEvent } from 'react';

type UploadImageFormProps = {
    href: string;
    galleryId?: string;
};

export default function UploadImageForm({
    href,
    galleryId = '',
}: UploadImageFormProps) {
    const { data, post, processing, errors } = useForm<{
        galleryId: string;
        image?: Blob | null;
    }>({
        galleryId: galleryId,
        image: null,
    });

    function submit() {
        post(href);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        data.image = file;
        submit();
    }

    return (
        <>
            <form>
                <h1>Upload Image</h1>
                <input
                    type="file"
                    accept="image/*"
                    disabled={processing}
                    onChange={handleChange}
                />
                <div>
                    <small className="text-red-500">{errors.image}</small>
                </div>
            </form>
        </>
    );
}
