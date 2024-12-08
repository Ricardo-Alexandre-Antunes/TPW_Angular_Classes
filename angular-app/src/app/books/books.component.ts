import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../book';
import { FormsModule } from '@angular/forms';
import { Author } from '../author';
import { Publisher } from '../publisher';
import { RouterModule } from '@angular/router';
import { BookService } from '../book.service';
import { AuthorService } from '../author.service';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[] = [];
  selectedBook: Book | null = null;
  selectedAuthors: Author[] | null = null;
  authors: Author[] = [];
  selectedPublisher: Publisher | null = null;
  publishers: Publisher[] = [];
  bookService: BookService = inject(BookService);
  authorService: AuthorService = inject(AuthorService);
  publisherService: PublisherService = inject(PublisherService);
  

  constructor() {
    this.bookService.getBooks().then((bks: Book[]) => this.books = bks);
    this.authorService.getAuthors().then((auths: Author[]) => this.authors = auths);
    this.publisherService.getPublishers().then((pubs: Publisher[]) => this.publishers = pubs);
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }
}
