import ContentList from '@/Components/ContentList';
import UploadImageForm from '@/Components/UploadImageForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GalleryData, PageProps } from '@/types';
import { HTMLAttributes } from 'react';

export default function Feed({
    galleries,
}: PageProps<{ galleries: GalleryData[] }>) {
    return (
        <AuthenticatedLayout>
            <UploadImageHeroSection />
            <section className="mt-9">
                <ContentList galleries={galleries} />
            </section>
        </AuthenticatedLayout>
    );
}

function UploadImageHeroSection({ ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <section {...props}>
            <div className="hero h-80 bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h2 className="mb-4 text-4xl font-bold">
                            Anything you want to share?
                        </h2>
                        <UploadImageForm
                            href={route('galleries.store')}
                            inputHidden
                        >
                            <label className="btn btn-primary" htmlFor="input">
                                Upload Your Gallery Now!
                            </label>
                        </UploadImageForm>
                    </div>
                </div>
            </div>
        </section>
    );
}
