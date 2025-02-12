import ContentList from '@/Components/ContentList';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps, User } from '@/types';
import { Link } from '@inertiajs/react';

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
            <h1 className="text-xl">{`${profileUser.name}'s Galleries`}</h1>
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
            )}
            {galleries.length > 0 ? (
                <ContentList galleries={galleries} />
            ) : (
                <h2 className="text-lg">Nothing's here...</h2>
            )}
        </Authenticated>
    );
}
