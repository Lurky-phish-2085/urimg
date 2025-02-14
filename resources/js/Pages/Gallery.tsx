import CopyClipboardButton from '@/Components/CopyClipboardButton';
import CopyLinkButton from '@/Components/CopyLinkButton';
import GalleryImage from '@/Components/GalleryImage';
import InputLabel from '@/Components/InputLabel';
import MyModal from '@/Components/MyModal';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import Toast from '@/Components/Toast';
import UploadImageForm from '@/Components/UploadImageForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import {
    BookmarkData,
    CommentData,
    GalleryData,
    ImageData,
    LikeData,
    PageProps,
} from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormEvent, KeyboardEvent, useCallback, useState } from 'react';
import {
    AiFillDislike,
    AiFillHeart,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineHeart,
    AiOutlineLike,
} from 'react-icons/ai';
import { BiLink } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

dayjs.extend(relativeTime);

export default function Gallery({
    auth,
    retrieval_id,
    gallery,
    images,
    comments,
    userLike,
    userBookmark,
    userBookmarked,
    likesCount,
    dislikesCount,
    isFromCommunity,
    editMode,
    success,
}: PageProps<{
    retrieval_id: string;
    gallery: GalleryData;
    images: ImageData[];
    comments: CommentData[];
    userLike: LikeData | null;
    userBookmark: BookmarkData;
    userBookmarked: boolean;
    likesCount: number;
    dislikesCount: number;
    isFromCommunity: boolean;
    editMode: boolean;
    success: string;
}>) {
    const canEdit = useCallback((): boolean => {
        if (!gallery) {
            return false;
        }
        if (!auth.user) {
            return editMode;
        }

        return auth.user.id ? auth.user.id === gallery.user_id : false;
    }, []);

    const [editing, setEditing] = useState(editMode);

    return (
        <>
            <Head
                title={
                    canEdit()
                        ? 'Edit Gallery'
                        : `Gallery - ${gallery ? gallery.title || gallery.retrieval_id : images.at(0)?.retrieval_id}`
                }
            ></Head>
            {auth.user ? (
                <Authenticated>
                    <Toast
                        status="success"
                        message={success}
                        open={Boolean(success)}
                    />
                    <div className="p-4">
                        <div className="flex flex-col">
                            {gallery ? (
                                <aside
                                    className={
                                        'hidden md:block lg:sticky lg:left-0 lg:top-28 lg:mb-10 lg:w-96'
                                    }
                                >
                                    {editing ? (
                                        <GalleryEditForm
                                            onDone={() => setEditing(false)}
                                            galleryData={gallery}
                                        />
                                    ) : (
                                        <GalleryInfo
                                            onEdit={() => setEditing(true)}
                                            retrieval_id={retrieval_id}
                                            data={gallery}
                                            likesCount={likesCount}
                                            dislikesCount={dislikesCount}
                                            isFromCommunity={isFromCommunity}
                                            userBookmark={userBookmark}
                                            userBookmarked={userBookmarked}
                                            userLike={userLike}
                                        />
                                    )}
                                </aside>
                            ) : (
                                <></>
                            )}
                            <div className="flex flex-col items-center gap-12 lg:-mt-80 lg:ml-auto lg:mr-36 lg:w-96 lg:only:mx-auto lg:only:mt-0 xl:mx-auto xl:w-96">
                                {images.map((image) => (
                                    <GalleryImage
                                        key={image.id}
                                        data={image}
                                        editMode={canEdit()}
                                    />
                                ))}
                            </div>
                        </div>
                        {isFromCommunity && (
                            <div className="mt-4">
                                <CommentSection
                                    gallery={gallery}
                                    comments={comments}
                                />
                            </div>
                        )}
                    </div>
                </Authenticated>
            ) : (
                <GuestLayout hideFooter>
                    <Toast
                        status="success"
                        message={success}
                        open={Boolean(success)}
                    />
                    <Toast
                        status="success"
                        message={success}
                        open={Boolean(success)}
                    />
                    <div className="p-4">
                        <div className="flex flex-col">
                            {gallery ? (
                                <aside
                                    className={
                                        'hidden md:block lg:sticky lg:left-0 lg:top-28 lg:mb-10 lg:w-96'
                                    }
                                >
                                    {editing ? (
                                        <GalleryEditForm
                                            onDone={() => setEditing(false)}
                                            galleryData={gallery}
                                        />
                                    ) : (
                                        <GalleryInfo
                                            onEdit={() => setEditing(true)}
                                            retrieval_id={retrieval_id}
                                            data={gallery}
                                            likesCount={likesCount}
                                            dislikesCount={dislikesCount}
                                            isFromCommunity={isFromCommunity}
                                            userBookmark={userBookmark}
                                            userBookmarked={userBookmarked}
                                            userLike={userLike}
                                        />
                                    )}
                                </aside>
                            ) : (
                                <></>
                            )}
                            <div className="flex flex-col items-center gap-12 lg:-mt-80 lg:ml-auto lg:mr-36 lg:w-96 lg:only:mx-auto lg:only:mt-0 xl:mx-auto xl:w-96">
                                {images.map((image) => (
                                    <GalleryImage
                                        key={image.id}
                                        data={image}
                                        editMode={canEdit()}
                                    />
                                ))}
                            </div>
                        </div>
                        {isFromCommunity && (
                            <div className="mt-4">
                                <CommentSection
                                    gallery={gallery}
                                    comments={comments}
                                />
                            </div>
                        )}
                    </div>
                </GuestLayout>
            )}
        </>
    );
}

type GalleryEditFormProps = {
    className?: string;
    galleryData: GalleryData;
    onDone: () => void;
};

function GalleryEditForm({
    className = '',
    galleryData,
    onDone = () => {},
}: GalleryEditFormProps) {
    const { setData, patch, errors, clearErrors } = useForm<{
        title: string;
        description: string;
    }>({
        title: galleryData.title,
        description: galleryData.description,
    });

    const [title, setTitle] = useState(galleryData.title);
    const [description, setDescription] = useState(galleryData.description);

    const submit = () => {
        patch(route('galleries.update', galleryData.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const submitOnEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <>
            <div className={className}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <div className="card block bg-base-100 lg:shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4 md:mb-0 lg:mb-0">
                                Edit Gallery
                            </h2>
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
                            <div className="card-actions flex-wrap justify-around lg:justify-between">
                                <UploadImageForm
                                    href={route('images.store')}
                                    galleryId={galleryData.id}
                                    inputHidden
                                >
                                    <label
                                        className="btn btn-primary"
                                        htmlFor="input"
                                    >
                                        {/* Add image icon */}
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0"
                                                fill="none"
                                                width="24"
                                                height="24"
                                            />

                                            <g>
                                                <path d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
                                            </g>
                                        </svg>
                                        Add Image
                                    </label>
                                </UploadImageForm>
                                <MyModal
                                    className="btn btn-error"
                                    variant="prompt-danger"
                                    title="Delete Gallery?"
                                    message="This action cannot be undone."
                                    acceptValue="Delete"
                                    onAccept={() => {
                                        router.delete(
                                            route(
                                                'galleries.destroy',
                                                galleryData.id,
                                            ),
                                        );
                                    }}
                                >
                                    {/* Delete icon */}
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 11V17"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14 11V17"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 7H20"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Delete
                                </MyModal>
                                <button
                                    onClick={onDone}
                                    className="btn btn-block mt-4"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

type CommentSectionProps = {
    gallery: GalleryData;
    comments: CommentData[];
};

function CommentSection({ gallery, comments }: CommentSectionProps) {
    const { data, setData, processing, post, reset, errors, clearErrors } =
        useForm<{
            content: string;
        }>({
            content: '',
        });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('comments.store', gallery.id), {
            preserveScroll: true,
            preserveState: true,
        });
        reset();
    };

    return (
        <section className="border-t-2">
            <form onSubmit={submit}>
                <h2 className="text-2xl">Comments</h2>
                <InputLabel htmlFor="comment" errorMessage={errors.content}>
                    <TextArea
                        id="comment"
                        name="comment"
                        placeholder="Type your comment here!"
                        value={data.content}
                        className="mt-1 block w-full"
                        onChange={(e) => {
                            setData('content', e.target.value);
                            clearErrors('content');
                        }}
                    />
                </InputLabel>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing}
                >
                    Comment
                </button>
            </form>
            {comments.map((comment) => (
                <div key={comment.id} className="my-4 divide-y-2">
                    <div className="flex items-center gap-2 text-base-content">
                        <small>
                            <a
                                href={route('user-page', comment.author_name)}
                                className="underline hover:text-black"
                            >
                                {comment.author_name}
                            </a>
                            {comment.user_id === gallery.user_id && (
                                <>
                                    <span>&nbsp;</span>
                                    <strong className="text-primary">
                                        [ OP ]
                                    </strong>
                                </>
                            )}
                        </small>
                        <div className="flex gap-1">
                            <small>{dayjs(comment.created_at).fromNow()}</small>
                            {comment.created_at !== comment.updated_at && (
                                <>
                                    <span>&middot;</span>
                                    <small>edited</small>
                                </>
                            )}
                        </div>
                    </div>
                    <p>{comment.content}</p>
                </div>
            ))}
        </section>
    );
}

type GalleryInfoProps = {
    className?: string;
    retrieval_id: string;
    data: GalleryData;
    userLike: LikeData | null;
    userBookmark: BookmarkData;
    userBookmarked: boolean;
    likesCount: number;
    dislikesCount: number;
    isFromCommunity: boolean;
    onEdit: () => void;
};

function GalleryInfo({
    className,
    data,
    retrieval_id,
    userLike,
    userBookmark,
    userBookmarked,
    likesCount,
    dislikesCount,
    isFromCommunity,
    onEdit,
}: GalleryInfoProps) {
    const { auth, editMode } =
        usePage<PageProps<{ editMode: boolean }>>().props;

    const canEdit = useCallback((): boolean => {
        if (!auth.user) {
            return editMode;
        }

        return auth.user.id ? auth.user.id === data.user_id : false;
    }, []);

    return (
        <div className={'card block bg-base-100 lg:shadow-md ' + className}>
            <div className="card-body">
                <div className="flex items-center">
                    <h1 className="card-title text-4xl">
                        {data.title || data.retrieval_id}
                    </h1>
                    {canEdit() && (
                        <button
                            onClick={onEdit}
                            className="btn btn-ghost btn-sm"
                        >
                            <FaEdit />
                        </button>
                    )}
                </div>
                <hr />
                <div className="prose mt-4">
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="card-actions mb-2 justify-around md:justify-start lg:justify-start">
                {isFromCommunity ? (
                    <>
                        <div className="flex items-center justify-center gap-4 p-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={
                                        userBookmarked
                                            ? () => {
                                                  router.delete(
                                                      route(
                                                          'bookmarks.destroy',
                                                          userBookmark.id,
                                                      ),
                                                  );
                                              }
                                            : () => {
                                                  router.post(
                                                      route('bookmarks.store'),
                                                      {
                                                          content_retrieval_id:
                                                              retrieval_id,
                                                      },
                                                  );
                                              }
                                    }
                                    className={
                                        'btn btn-ghost ' +
                                        (auth.user && userBookmarked
                                            ? 'text-red-400'
                                            : '')
                                    }
                                >
                                    {auth.user && userBookmarked ? (
                                        <AiFillHeart className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineHeart className="h-5 w-5" />
                                    )}
                                </button>
                                <Link
                                    className={'btn btn-ghost'}
                                    as="button"
                                    method="post"
                                    href={
                                        auth.user && userLike && userLike.liked
                                            ? route(
                                                  'galleries.removeLike',
                                                  data.id,
                                              )
                                            : route('galleries.like', data.id)
                                    }
                                >
                                    {auth.user && userLike && userLike.liked ? (
                                        <AiFillLike className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineLike className="h-5 w-5" />
                                    )}
                                </Link>
                                <small>{likesCount}</small>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    className={'btn btn-ghost'}
                                    as="button"
                                    method="post"
                                    href={
                                        auth.user && userLike && !userLike.liked
                                            ? route(
                                                  'galleries.removeLike',
                                                  data.id,
                                              )
                                            : route(
                                                  'galleries.dislike',
                                                  data.id,
                                              )
                                    }
                                >
                                    {auth.user &&
                                    userLike &&
                                    !userLike.liked ? (
                                        <AiFillDislike className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineDislike className="h-5 w-5" />
                                    )}
                                </Link>
                                <small>{dislikesCount}</small>
                            </div>
                            <CopyClipboardButton
                                valueToCopy={route('home') + `/${retrieval_id}`}
                                defaultContent={<BiLink className="h-5 w-5" />}
                                successContent={
                                    <BiLink className="h-5 w-5 text-primary" />
                                }
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center gap-4 p-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    router.post(route('bookmarks.store'), {
                                        content_retrieval_id: retrieval_id,
                                    });
                                }}
                                className="btn btn-ghost"
                            >
                                <AiOutlineHeart className="h-5 w-5" />
                            </button>
                            {isFromCommunity && (
                                <>
                                    <Link
                                        className={'btn btn-ghost'}
                                        as="button"
                                        method="post"
                                        href={route('galleries.like', data.id)}
                                    >
                                        <AiOutlineLike className="h-5 w-5" />
                                    </Link>
                                    <small>{likesCount}</small>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {isFromCommunity && (
                                <>
                                    <Link
                                        className={'btn btn-ghost'}
                                        as="button"
                                        method="post"
                                        href={route(
                                            'galleries.dislike',
                                            data.id,
                                        )}
                                    >
                                        <AiOutlineDislike className="h-5 w-5" />
                                    </Link>
                                    <small>{dislikesCount}</small>
                                </>
                            )}
                        </div>
                        <CopyLinkButton
                            value={`${route('home')}/${retrieval_id}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
