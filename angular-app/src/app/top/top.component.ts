import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../author';
import { Publisher } from '../publisher';
import { Book } from '../book';
import { AuthorService } from '../author.service';
import { PublisherService } from '../publisher.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-top',
  imports: [CommonModule, RouterModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  authors: Author[] = [];
  publishers: Publisher[] = [];
  books: Book[] = [];
  authorService: AuthorService = inject(AuthorService);
  publisherService: PublisherService = inject(PublisherService);
  bookService: BookService = inject(BookService);

  constructor() {
    this.authorService.getAuthorsN(4).then((auths: Author[]) => this.authors = auths);
    this.publisherService.getPublishersN(4).then((pubs: Publisher[]) => this.publishers = pubs);
    this.bookService.getBooksN(4).then((bks: Book[]) => this.books = bks);
  }
}
