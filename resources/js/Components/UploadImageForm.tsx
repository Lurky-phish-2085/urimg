import { useForm } from '@inertiajs/react';
import { ChangeEvent, PropsWithChildren } from 'react';

interface UploadImageFormProps extends PropsWithChildren {
    className?: string;
    href: string;
    galleryId?: number | null;
    inputHidden?: boolean;
}

export default function UploadImageForm({
    children,
    className = '',
    href,
    galleryId = null,
    inputHidden = false,
}: UploadImageFormProps) {
    const { data, post, processing, errors } = useForm<{
        galleryId: number | null;
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
            <form className={className}>
                <input
                    id="input"
                    type="file"
                    accept="image/*"
                    disabled={processing}
                    onChange={handleChange}
                    hidden={inputHidden}
                />
                {children}
                <div>
                    <small className="text-red-500">{errors.image}</small>
                </div>
            </form>
        </>
    );
}
