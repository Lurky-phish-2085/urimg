import UploadImageForm from '@/Components/UploadImageForm';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { RiGitRepositoryFill } from 'react-icons/ri';

export default function Welcome({
    auth,
    success,
}: PageProps<{ laravelVersion: string; phpVersion: string; success: string }>) {
    useEffect(() => {
        if (!success) return;
        alert(success);
    }, [success]);

    return (
        <>
            <Head title="Welcome">
                {/* <link
                    rel="icon"
                    type="image/png"
                    href="/favicon-96x96.png"
                    sizes="96x96"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <meta name="apple-mobile-web-app-title" content="ShortLinks" />
                <link rel="manifest" href="/site.webmanifest" /> */}
            </Head>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white">
                <div className="relative flex min-h-screen flex-col items-center">
                    <div className="flex h-full w-full flex-col">
                        <div className="bg-[#1F2937] px-8 text-lg text-[#E5E7EB]">
                            <header className="flex py-4">
                                <a href="/">
                                    <h1 className="text-2xl font-black text-[#F9FAF8]">
                                        LARAVEL
                                    </h1>
                                </a>
                                <nav className="-mx-3 flex flex-1 justify-end">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </header>
                        </div>
                        <main className="flex-grow">
                            <UploadImageForm href={route('galleries.store')} />
                        </main>
                    </div>
                    <footer className="mt-auto flex min-w-full flex-col items-center justify-center overflow-hidden p-4">
                        <p>
                            Made with ❤️ by{' '}
                            <a
                                className="underline"
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Lurky-Phish-2085
                            </a>
                        </p>
                        <div className="flex items-center">
                            <RiGitRepositoryFill />
                            <p>
                                <a
                                    className="underline"
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    See Source Code
                                </a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
