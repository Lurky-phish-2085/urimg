import { ImageData } from '@/types';

type ImageProps = {
    data: ImageData;
};

export default function Image({ data }: ImageProps) {
    return (
        <div className="w-max border border-red-200 p-2">
            {data.title && (
                <>
                    <h1>{data.title}</h1>
                    <hr className="my-4 border-t border-gray-300" />
                </>
            )}
            <img src={data.image_url} width={256} />
            {data.description && (
                <>
                    <p>{data.description} </p>
                    <hr className="my-4 border-t border-gray-300" />
                </>
            )}
        </div>
    );
}
