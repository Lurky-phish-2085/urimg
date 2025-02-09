import {
    forwardRef,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handlePasswordToggle = (e: MouseEvent) => {
        e.preventDefault();

        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    };

    const preventInputSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            {type === 'password' ? (
                <label
                    htmlFor={props.id}
                    className="input input-bordered flex items-center"
                >
                    <input
                        {...props}
                        type={inputType}
                        className={
                            'grow border-hidden p-0 focus:border-transparent focus:outline-none focus:ring-0 ' +
                            className
                        }
                        ref={localRef}
                        onKeyDown={preventInputSubmit}
                    />
                    <button
                        onClick={handlePasswordToggle}
                        className="btn btn-circle btn-sm border-hidden bg-transparent p-0 shadow-transparent"
                    >
                        {inputType === 'password' ? (
                            <AiOutlineEyeInvisible />
                        ) : (
                            <AiOutlineEye />
                        )}
                    </button>
                </label>
            ) : (
                <input
                    {...props}
                    type={type}
                    className={
                        'input input-bordered w-full max-w-xs' + className
                    }
                    ref={localRef}
                    onKeyDown={preventInputSubmit}
                />
            )}
        </>
    );
});
