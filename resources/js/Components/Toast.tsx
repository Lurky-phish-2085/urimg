import { useEffect, useRef } from 'react';

const DEFAULT_TIMEOUT_DELAY = 2500;

type ToastProps = {
    status: 'success' | 'fail';
    message: string;
    delay?: number;
    open: boolean;
};

export default function Toast({ status, message, delay, open }: ToastProps) {
    const toastRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;

        setTimeout(
            () => {
                toastRef.current?.classList.toggle('hidden');
            },
            delay ? delay : DEFAULT_TIMEOUT_DELAY,
        );
    }, [open]);

    return (
        <>
            {open && (
                <div
                    ref={toastRef}
                    className="toast toast-center toast-top z-50"
                >
                    <div
                        className={
                            'alert ' +
                            (status === 'success'
                                ? 'alert-success'
                                : 'alert-error')
                        }
                    >
                        <span>{message}</span>
                    </div>
                </div>
            )}
        </>
    );
}
