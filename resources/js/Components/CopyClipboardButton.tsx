import { ButtonHTMLAttributes, ReactNode, useState } from 'react';

const CLIPBOARD_CHECKED_STATE_DURATION = 2 * 1000;

interface CopyClipboardButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string;
    defaultContent: ReactNode;
    successContent: ReactNode;
}

export default function CopyClipboardButton({
    className,
    valueToCopy,
    defaultContent,
    successContent,
    disabled,
    ...props
}: CopyClipboardButtonProps) {
    const [clipboardChecked, setClipboardChecked] = useState(false);

    const checkClipboard = () => {
        setClipboardChecked(true);

        setTimeout(() => {
            setClipboardChecked(false);
        }, CLIPBOARD_CHECKED_STATE_DURATION);
    };

    const copyToClipboard = () => {
        if (!valueToCopy) {
            return;
        }

        navigator.clipboard.writeText(valueToCopy).then(
            () => {
                checkClipboard();
            },
            () => {
                alert('Failed to copy to clipboard... Please try again.');
            },
        );
    };

    return (
        <button
            {...props}
            className={`btn btn-ghost ${className}`}
            disabled={disabled}
            onClick={copyToClipboard}
        >
            {clipboardChecked ? <>{successContent}</> : <>{defaultContent}</>}
        </button>
    );
}
