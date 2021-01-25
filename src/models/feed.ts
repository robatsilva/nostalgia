import { Author } from './author';

export class Feed{
    id: string;
    author: Author;
    description: string;
    image: string;
    aspectRatio: number;
    comments: Comment[];
}