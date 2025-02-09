import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <input
                    {...props}
                    type="checkbox"
                    className={'checkbox ' + className}
                />
            </label>
        </div>
    );
}
