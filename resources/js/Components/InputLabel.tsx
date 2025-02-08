import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    errorMessage = '',
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
    value?: string;
    errorMessage?: string;
}) {
    return (
        <label
            {...props}
            className={`form-control w-full max-w-xs` + className}
        >
            <div className="label">
                <span className="label-text">{value}</span>
            </div>
            {children}
            <div className="label">
                <span className="label-text-alt text-error">
                    {errorMessage}
                </span>
            </div>
        </label>
    );
}
