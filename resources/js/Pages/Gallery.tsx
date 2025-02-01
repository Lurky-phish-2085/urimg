import Image from '@/Components/Image';
import { Button } from '@/Components/ui/button';
import UploadImageForm from '@/Components/UploadImageForm';
import { CommentData, GalleryData, ImageData, PageProps } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

export default function Gallery({
    gallery,
    images,
    comments,
    isFromCommunity,
    editMode,
    success,
}: PageProps<{
    gallery: GalleryData;
    images: ImageData[];
    comments: CommentData[];
    isFromCommunity: boolean;
    editMode: boolean;
    success: string;
}>) {
    const { auth } = usePage().props;

    const canEdit = useCallback((): boolean => {
        if (!auth.user) {
            return editMode;
        }

        return auth.user.id ? auth.user.id === gallery.user_id : false;
    }, []);

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
                title={
                    canEdit()
                        ? 'Edit Gallery'
                        : `Gallery - ${gallery ? gallery.title || gallery.retrieval_id : images.at(0)?.retrieval_id}`
                }
            ></Head>
            <div className="flex flex-col gap-2 p-4">
                {canEdit() ? (
                    <GalleryEditForm galleryData={gallery} />
                ) : gallery ? (
                    <>
                        <h1 className="text-xl">
                            {gallery.title || gallery.retrieval_id}
                        </h1>
                        <hr />
                        <p>{gallery.description}</p>
                    </>
                ) : (
                    <></>
                )}
                {images.map((image) => (
                    <Image key={image.id} data={image} editMode={canEdit()} />
                ))}
                {isFromCommunity && (
                    <CommentSection
                        galleryId={gallery.id}
                        comments={comments}
                    />
                )}
            </div>
        </>
    );
}

type GalleryEditFormProps = {
    galleryData: GalleryData;
};

function GalleryEditForm({ galleryData }: GalleryEditFormProps) {
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
        patch(route('galleries.update', galleryData.id), {
            preserveScroll: true,
            preserveState: true,
        });
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

type CommentSectionProps = {
    galleryId: number;
    comments: CommentData[];
};

function CommentSection({ galleryId, comments }: CommentSectionProps) {
    const { data, setData, processing, post, reset } = useForm<{
        content: string;
    }>({
        content: '',
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('content', e.target.value);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('comments.store', galleryId), {
            preserveScroll: true,
            preserveState: true,
        });
        reset();
    };

    return (
        <section className="border border-red-500 p-4">
            <h1 className="text-xl">Comments</h1>
            <form onSubmit={submit}>
                <textarea
                    placeholder="Type your comment here!"
                    value={data.content}
                    disabled={processing}
                    onChange={handleChange}
                ></textarea>
                <Button type="submit" disabled={processing}>
                    Comment
                </Button>
            </form>
            {comments.map((comment) => (
                <p key={comment.id}>{comment.content}</p>
            ))}
        </section>
    );
}
