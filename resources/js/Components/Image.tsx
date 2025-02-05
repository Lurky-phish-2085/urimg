import { ImageData } from '@/types';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

type ImageProps = {
    data: ImageData;
    editMode: boolean;
};

export default function Image({ data, editMode }: ImageProps) {
    const { setData, patch, errors } = useForm<{
        title: string;
        description: string;
    }>({
        title: data.title,
        description: data.description,
    });

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);

    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const submit = () => {
        patch(route('images.update', data.id), {
            preserveScroll: true,
            preserveState: true,
        });
        inputRef1.current?.blur();
        inputRef2.current?.blur();
    };

    return (
        <div className="w-max border border-red-200 p-2">
            {editMode ? (
                <>
                    <input
                        ref={inputRef1}
                        type="text"
                        placeholder="Title"
                        onBlur={submit}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setData('title', e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') submit();
                        }}
                    />
                    <small className="text-red-500">{errors.title}</small>
                </>
            ) : title ? (
                <>
                    <h1>{title}</h1>
                    <hr className="my-2 border-t border-gray-300" />
                </>
            ) : (
                <></>
            )}
            <img src={data.image_url} width={256} />
            {editMode ? (
                <>
                    <input
                        ref={inputRef2}
                        type="text"
                        placeholder="Description"
                        onBlur={submit}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setData('description', e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') submit();
                        }}
                    />
                    <small className="text-red-500">{errors.description}</small>
                </>
            ) : description ? (
                <>
                    <hr className="my-2 border-t border-gray-300" />
                    <p>{description} </p>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
