import { HTMLAttributes } from 'react';

export default function ApplicationLogo({
    className = '',
}: HTMLAttributes<HTMLDivElement> & { className?: string }) {
    return (
        <div className={`text-xl font-black ` + className}>
            <span>ur</span>
            <span className="mr-1 italic">i</span>
            <span>mg</span>
        </div>
    );
}
