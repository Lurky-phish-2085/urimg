import { PropsWithChildren, useCallback, useRef } from 'react';

interface MyModalProps extends PropsWithChildren {
    className?: string;
    variant?: 'info' | 'prompt' | 'prompt-danger';
    title: string;
    message: string;
    acceptValue: string;
    onAccept?: () => void;
}

export default function MyModal({
    children,
    className = 'btn',
    variant = 'info',
    title,
    message,
    acceptValue = 'Okay',
    onAccept = () => {},
}: MyModalProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const isPrompt = useCallback(() => {
        return variant.startsWith('prompt');
    }, []);

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    return (
        <>
            <button className={className} onClick={openModal}>
                {children}
            </button>
            <dialog
                ref={dialogRef}
                id="my_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {isPrompt() && (
                                <button
                                    onClick={onAccept}
                                    className={
                                        'btn mr-2 ' +
                                        (variant === 'prompt-danger'
                                            ? 'btn-error'
                                            : 'btn-primary')
                                    }
                                >
                                    {acceptValue}
                                </button>
                            )}
                            <button className="btn btn-ghost">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
