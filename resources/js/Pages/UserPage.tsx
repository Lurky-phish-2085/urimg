import ContentList from '@/Components/ContentList';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps, User } from '@/types';
import { Link } from '@inertiajs/react';
import { FiSettings } from 'react-icons/fi';

export default function UserPage({
    auth,
    galleries,
    profileUser,
    following,
    followersCount,
}: PageProps<{
    galleries: GalleryData[];
    profileUser: User;
    following: boolean;
    followersCount: number;
}>) {
    return (
        <Authenticated>
            {/* <h1 className="text-xl">{`${profileUser.name}'s Galleries`}</h1>
            <div>
                <small>Followers: {followersCount}</small>
            </div>
            {auth.user.id !== profileUser.id ? (
                <Link
                    as="button"
                    method="post"
                    href={
                        following
                            ? route('unfollow', profileUser.id)
                            : route('follow', profileUser.id)
                    }
                >
                    {following ? (
                        <div className="text-blue-500 underline">Following</div>
                    ) : (
                        <div className="hover:underline">Follow</div>
                    )}
                </Link>
            ) : (
                <></>
            )} */}
            <div className="m-4 flex items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-xl font-semibold">
                        {profileUser.name}
                    </div>
                    <div>Followers: {followersCount}</div>
                    <div>Likes: 256</div>
                    <div>Galleries: 28</div>
                </div>
                <div className="ml-auto">
                    {auth.user.id === profileUser.id ? (
                        <Link
                            as="button"
                            method="get"
                            href={route('profile.edit')}
                            className="btn btn-ghost"
                        >
                            <FiSettings className="h-6 w-6" />
                        </Link>
                    ) : (
                        <Link
                            as="button"
                            method="post"
                            href={
                                following
                                    ? route('unfollow', profileUser.id)
                                    : route('follow', profileUser.id)
                            }
                            className={
                                'btn ' +
                                (following ? 'btn-primary' : 'btn-outline')
                            }
                        >
                            {following ? 'Following' : 'Follow'}
                        </Link>
                    )}
                </div>
            </div>
            {galleries.length > 0 ? (
                <ContentList galleries={galleries} />
            ) : (
                <h2 className="text-lg">Nothing's here...</h2>
            )}
        </Authenticated>
    );
}
