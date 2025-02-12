import { ButtonHTMLAttributes } from 'react';
import { BiLink } from 'react-icons/bi';
import CopyClipboardButton from './CopyClipboardButton';

export default function CopyLinkButton({
    value,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
    return (
        <CopyClipboardButton
            {...props}
            valueToCopy={value}
            defaultContent={<BiLink className="h-5 w-5" />}
            successContent={<BiLink className="h-5 w-5 text-primary" />}
        />
    );
}
