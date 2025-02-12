import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Content {
    id: number;
    retrieval_id: string;
    title: string;
    description: string;
}

export interface GalleryData extends Content {
    user_id: number;
    thumbnail_url: string;
}

export interface ImageData extends Content {
    image_url: string;
}

export interface CommentData {
    id: number;
    user_id: number;
    author_name: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface LikeData {
    id: number;
    user_id: number;
    liked: boolean;
    created_at: string;
    updated_at: string;
}

export interface BookmarkData {
    id: number;
    content_retrieval_id: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
