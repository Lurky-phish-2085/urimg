import { ImageData } from '@/types';
import { useForm } from '@inertiajs/react';
import { KeyboardEvent, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import InputLabel from './InputLabel';
import TextArea from './TextArea';
import TextInput from './TextInput';

type ImageProps = {
    data: ImageData;
    editMode: boolean;
};

export default function GalleryImage({ data, editMode }: ImageProps) {
    const { setData, patch, errors, clearErrors } = useForm<{
        title: string;
        description: string;
    }>({
        title: data.title,
        description: data.description,
    });

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);

    const [editing, setEditing] = useState(false);

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

    const submitOnEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <div className="card block min-w-full bg-base-100 shadow-lg">
            <div className="card-body">
                {editing ? (
                    <>
                        <InputLabel
                            htmlFor="title"
                            value="Title"
                            errorMessage={errors.title}
                        >
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onBlur={submit}
                                onKeyDown={submitOnEnter}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setData('title', e.target.value);
                                    clearErrors('title');
                                }}
                            />
                        </InputLabel>
                        <InputLabel
                            htmlFor="description"
                            value="Description"
                            errorMessage={errors.title}
                        >
                            <TextArea
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={description}
                                className="mt-1 block w-full"
                                onBlur={submit}
                                onKeyDown={submitOnEnter}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setData('description', e.target.value);
                                    clearErrors('description');
                                }}
                            />
                        </InputLabel>
                        <button
                            onClick={() => setEditing(false)}
                            className="btn btn-block"
                        >
                            Done
                        </button>
                        <img src={data.image_url} width={800} />
                    </>
                ) : (
                    <>
                        <div className="flex">
                            <h1 className="card-title">
                                {data.title || data.retrieval_id}
                            </h1>
                            {editMode && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="btn btn-ghost btn-sm"
                                >
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                        <hr />
                        <div className="prose">
                            <img src={data.image_url} width={800} />
                            <p>{description} </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
