import { PropsWithChildren } from 'react';
import ApplicationLogo from './ApplicationLogo';

export default function BaseHeaderNavBar({ children }: PropsWithChildren) {
    return (
        <header className="glass sticky top-0 z-50 bg-base-100 bg-opacity-65">
            <div className="navbar">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl" href={route('home')}>
                        <ApplicationLogo />
                    </a>
                </div>
                {children}
            </div>
        </header>
    );
}
