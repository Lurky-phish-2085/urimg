import ApplicationLogo from '@/Components/ApplicationLogo';
import InputLabel from '@/Components/InputLabel';
import LoadingOverlay from '@/Components/LoadingOverlay';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout className="mb-40 md:mb-0 lg:mb-0">
            <Head title="Register" />
            <LoadingOverlay open={processing} />
            <div className="card mx-auto my-auto mt-4 block bg-base-100 lg:h-1/2 lg:w-1/2 lg:shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4 md:mb-0 lg:mb-0">
                        Registration
                    </h2>
                    <div className="flex flex-col-reverse md:flex-row lg:flex-row">
                        <form className="flex-grow" onSubmit={submit}>
                            <InputLabel
                                htmlFor="name"
                                value="Name"
                                errorMessage={errors.name}
                            >
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                            </InputLabel>
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
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
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
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />
                            </InputLabel>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                errorMessage={errors.password_confirmation}
                            >
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </InputLabel>
                            <div className="card-actions mt-2">
                                <button className="btn btn-primary">
                                    Register
                                </button>
                                <a
                                    className="btn btn-link"
                                    href={route('login')}
                                >
                                    <span className="font-normal transition-all hover:font-black">
                                        Already registered?
                                    </span>
                                </a>
                            </div>
                        </form>
                        <div className="self-center md:w-1/2 md:text-center lg:w-1/2 lg:text-center">
                            <ApplicationLogo className="mb-4 text-4xl" />
                            <h1 className="text-xl font-bold">
                                Join & Explore with the Community
                            </h1>
                            <p className="py-6">
                                Effortlessly upload, organize, and showcase your
                                images. Join our community and explore endless
                                inspiration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
