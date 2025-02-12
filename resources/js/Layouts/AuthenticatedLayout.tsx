import BaseHeaderNavBar from '@/Components/BaseHeaderNavBar';
import ToggleTheme from '@/Components/ToggleTheme';
import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBookBookmark } from 'react-icons/bi';
import { TbBroadcast } from 'react-icons/tb';

export default function Authenticated({
    children,
    className = 'mb-36 lg:mb-16',
}: PropsWithChildren<{ className?: string }>) {
    return (
        <>
            <AuthHeader />
            <Main className={className}>{children}</Main>
            <BottomNav />
        </>
    );
}

function AuthHeader() {
    return (
        <BaseHeaderNavBar>
            <AuthHeaderNavBarContent />
        </BaseHeaderNavBar>
    );
}

function AuthHeaderNavBarContent() {
    const { auth } = usePage().props;

    return (
        <>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    <li>
                        <Link
                            className={
                                route().current('feed') ? 'link-primary' : ''
                            }
                            href={route('feed')}
                        >
                            <AiOutlineHome className="h-8 w-8" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                route().current('following-page')
                                    ? 'link-primary'
                                    : ''
                            }
                            href={route('following-page')}
                        >
                            <TbBroadcast className="h-8 w-8" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                route().current('bookmarks.index')
                                    ? 'link-primary'
                                    : ''
                            }
                            href={route('bookmarks.index')}
                        >
                            <BiBookBookmark className="h-8 w-8" />
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end flex gap-6">
                <ToggleTheme />
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="avatar btn btn-circle btn-ghost"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li>
                            <Link href={route('user-page', auth.user.name)}>
                                {auth.user.name} - Profile
                            </Link>
                        </li>
                        <li>
                            <Link href={route('profile.edit')}>Settings</Link>
                        </li>
                        <li>
                            <Link
                                className="link-error"
                                method="post"
                                href={route('logout')}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

function Main({
    children,
    className = '',
}: PropsWithChildren<{ className?: string }>) {
    return <main className={`min-h-screen ${className}`}>{children}</main>;
}

function BottomNav() {
    return (
        <div className="block md:hidden">
            <div className="btm-nav">
                <button
                    className={route().current('feed') ? 'active' : ''}
                    onClick={() => {
                        router.get(route('feed'));
                    }}
                >
                    <AiOutlineHome className="h-5 w-5" />
                    <span className="btm-nav-label">Home</span>
                </button>
                <button
                    className={
                        route().current('following-page') ? 'active' : ''
                    }
                    onClick={() => {
                        router.get(route('following-page'));
                    }}
                >
                    <TbBroadcast className="h-5 w-5" />
                    <span className="btm-nav-label">Following</span>
                </button>
                <button
                    className={
                        route().current('bookmarks.index') ? 'active' : ''
                    }
                    onClick={() => {
                        router.get(route('bookmarks.index'));
                    }}
                >
                    <BiBookBookmark className="h-5 w-5" />
                    <span className="btm-nav-label">Bookmarks</span>
                </button>
            </div>
        </div>
    );
}
