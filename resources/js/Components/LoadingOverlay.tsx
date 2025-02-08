import { HTMLAttributes } from 'react';

export default function LoadingOverlay({
    open = false,
}: HTMLAttributes<HTMLDivElement> & { open: boolean }) {
    return (
        <div className={open ? 'block' : 'hidden'}>
            <div className="absolute inset-0 z-10 min-w-4 bg-black bg-opacity-15"></div>
            <div className="z-20 flex items-center justify-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </div>
    );
}
