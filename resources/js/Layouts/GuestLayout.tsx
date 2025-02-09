import ApplicationLogo from '@/Components/ApplicationLogo';
import BaseHeaderNavBar from '@/Components/BaseHeaderNavBar';
import ToggleTheme from '@/Components/ToggleTheme';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({
    children,
    className = '',
}: PropsWithChildren<{ className?: string }>) {
    return (
        <>
            <GuestHeader />
            <Main className={className}>{children}</Main>
            <Footer />
        </>
    );
}

function GuestHeader() {
    return (
        <BaseHeaderNavBar>
            <GuestHeaderNavBarContent />
        </BaseHeaderNavBar>
    );
}

function GuestHeaderNavBarContent() {
    const { auth } = usePage().props;

    return (
        <div className="navbar-end">
            <ToggleTheme />
            {auth.user ? (
                <a
                    className="btn btn-link text-base-content no-underline"
                    href={route('login')}
                >
                    Dashboard
                </a>
            ) : (
                <>
                    <a
                        className={
                            route().current('login')
                                ? 'btn btn-link'
                                : 'btn btn-link text-base-content no-underline'
                        }
                        href={route('login')}
                    >
                        Login
                    </a>
                    <a
                        className={
                            route().current('register')
                                ? 'btn btn-link'
                                : 'btn btn-link text-base-content no-underline'
                        }
                        href={route('register')}
                    >
                        Register
                    </a>
                </>
            )}
        </div>
    );
}

function Main({
    children,
    className = '',
}: PropsWithChildren<{ className?: string }>) {
    return <main className={`min-h-screen ${className}`}>{children}</main>;
}

function Footer() {
    return (
        <footer className="glass footer bottom-0 left-0 items-center overflow-hidden bg-neutral bg-opacity-65 p-4 text-neutral-content md:sticky lg:sticky">
            <FooterContent />
        </footer>
    );
}

function FooterContent() {
    return (
        <>
            <aside className="grid-flow-col items-center">
                <ApplicationLogo />
                <p>
                    Made with 💖 by{' '}
                    <a
                        className="link-hover font-black"
                        href="https://github.com/Lurky-phish-2085"
                        target="_blank"
                        rel="noopenner noreferrer"
                    >
                        Lurky-phish-2085
                    </a>
                    <span>!</span>
                </p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a
                    href="https://github.com/Lurky-phish-2085/urimg"
                    target="_blank"
                    rel="noopenner noreferrer"
                >
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 291.32 291.32"
                        className="fill-current"
                    >
                        <path d="M145.66,0C65.219,0,0,65.219,0,145.66c0,80.45,65.219,145.66,145.66,145.66 s145.66-65.21,145.66-145.66C291.319,65.219,226.1,0,145.66,0z M186.462,256.625c-0.838-11.398-1.775-25.518-1.83-31.235 c-0.364-4.388-0.838-15.549-11.434-22.677c42.068-3.523,62.087-26.774,63.526-57.499c1.202-17.497-5.754-32.883-18.107-45.3 c0.628-13.282-0.401-29.023-1.256-35.941c-9.486-2.731-31.608,8.949-37.79,13.947c-13.037-5.062-44.945-6.837-64.336,0 c-13.747-9.668-29.396-15.64-37.926-13.974c-7.875,17.452-2.813,33.948-1.275,35.914c-10.142,9.268-24.289,20.675-20.447,44.572 c6.163,35.04,30.816,53.94,70.508,58.564c-8.466,1.73-9.896,8.048-10.606,10.788c-26.656,10.997-34.275-6.791-37.644-11.425 c-11.188-13.847-21.23-9.832-21.849-9.614c-0.601,0.218-1.056,1.092-0.992,1.511c0.564,2.986,6.655,6.018,6.955,6.263 c8.257,6.154,11.316,17.27,13.2,20.438c11.844,19.473,39.374,11.398,39.638,11.562c0.018,1.702-0.191,16.032-0.355,27.184 C64.245,245.992,27.311,200.2,27.311,145.66c0-65.365,52.984-118.348,118.348-118.348S264.008,80.295,264.008,145.66 C264.008,196.668,231.69,239.992,186.462,256.625z"></path>
                    </svg>
                </a>
            </nav>
        </>
    );
}
