import { GalleryData } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import UploadImageForm from './UploadImageForm';
import { Button } from './ui/button';

type GalleryEditFormProps = {
    galleryData: GalleryData;
};

export default function GalleryEditForm({ galleryData }: GalleryEditFormProps) {
    const { setData, patch, processing, errors } = useForm<{
        title: string;
        description: string;
    }>({
        title: galleryData.title,
        description: galleryData.description,
    });

    const [title, setTitle] = useState(galleryData.title);
    const [description, setDescription] = useState(galleryData.description);

    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const submit = () => {
        patch(route('galleries.update', galleryData.id));
        inputRef1.current?.blur();
        inputRef2.current?.blur();
    };

    return (
        <>
            <div className="flex flex-col gap-2 p-2">
                <h1>Edit Mode</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <input
                            ref={inputRef1}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setData('title', e.target.value);
                            }}
                            onBlur={submit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submit();
                                }
                            }}
                            type="text"
                            placeholder="Title"
                            value={title}
                            disabled={processing}
                        />
                        <small className="text-red-500">{errors.title}</small>
                        <input
                            ref={inputRef2}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setData('description', e.target.value);
                            }}
                            onBlur={submit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submit();
                                }
                            }}
                            type="text"
                            placeholder="Description"
                            value={description}
                            disabled={processing}
                        />
                        <small className="text-red-500">
                            {errors.description}
                        </small>
                        <Button
                            className="hidden"
                            type="submit"
                            disabled={processing}
                        >
                            Save
                        </Button>
                    </div>
                </form>
                <UploadImageForm
                    href={route('images.store')}
                    galleryId={galleryData.id}
                />
                <Link
                    method="delete"
                    href={route('galleries.destroy', galleryData.id)}
                >
                    Delete
                </Link>
            </div>
        </>
    );
}
