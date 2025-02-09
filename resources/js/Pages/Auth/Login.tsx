import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import LoadingOverlay from '@/Components/LoadingOverlay';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <LoadingOverlay open={processing} />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="card mx-auto my-auto mt-4 block bg-base-100 lg:h-1/2 lg:w-1/2 lg:shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4 md:mb-0 lg:mb-0">Login</h2>
                    <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                        <form className="flex-grow" onSubmit={submit}>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                errorMessage={errors.email}
                            >
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </InputLabel>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                errorMessage={errors.password}
                            >
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                            </InputLabel>

                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                Remember me
                            </label>
                            <div className="card-actions mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={processing}
                                >
                                    Log in
                                </button>
                                {canResetPassword && (
                                    <a
                                        href={route('password.request')}
                                        className="btn btn-link"
                                    >
                                        Forgot your password?
                                    </a>
                                )}
                            </div>
                        </form>
                        <div className="md:w-1/2 md:text-center lg:w-1/2 lg:text-center">
                            <ApplicationLogo className="mb-4" />
                            <h1 className="text-xl font-bold">Welcome back!</h1>
                            <p className="py-6">
                                Please login with your account credentials to
                                continue.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
