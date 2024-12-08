import { Author } from './author';
import { Publisher } from './publisher';

export interface Book {
    id: number;
    title: string;
    date: Date;
    author: Author[];
    publisher: Publisher;
}