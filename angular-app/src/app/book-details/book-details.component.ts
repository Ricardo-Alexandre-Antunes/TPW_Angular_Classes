import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { Author } from '../author';
import { Publisher } from '../publisher';
import { AuthorService } from '../author.service';
import { PublisherService } from '../publisher.service';
import { BookService } from '../book.service';




@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book: Book | undefined;
  selectedAuthors: Author[] | null = null;
  authors: Author[] = [];
  selectedPublisher: Publisher | null = null;
  publishers: Publisher[] = [];
  bookService: BookService = inject(BookService);
  authorService: AuthorService = inject(AuthorService);
  publisherService: PublisherService = inject(PublisherService);


  constructor(private route: ActivatedRoute, private location: Location) {
    this.selectedAuthors = this.book?.author || [];
    this.selectedPublisher = this.book?.publisher || this.publishers[0];
    this.authorService.getAuthors().then((auths: Author[]) => this.authors = auths);
    this.publisherService.getPublishers().then((pubs: Publisher[]) => this.publishers = pubs);
    this.getBook();
  }

  getBook(): void {
    const num: any = this.route.snapshot.params['num'];
    if (num == null) {
      return;
    }
  
    this.bookService.getBook(+num).then((bk: Book) => {
      this.book = bk;
  
      this.selectedAuthors = bk.author.map((selectedAuthor) =>
        this.authors.find((author) => author.id === selectedAuthor.id) || selectedAuthor
      );
  
      this.selectedPublisher = this.publishers.find(
        (publisher) => publisher.id === bk.publisher?.id
      ) || bk.publisher;
  
      console.log("Selected Authors:", this.selectedAuthors);
      console.log("All Authors:", this.authors);
    });
  }
  

  update(): void {
    if (this.book == undefined) {
      return;
    }
    this.book.author = this.selectedAuthors || [];
    if (this.selectedPublisher) {
      this.book.publisher = this.selectedPublisher;
    }
    this.bookService.updateBook(this.book).then((data) => {
      console.log(data);
      this.goBack();
    });
  }

  delete(): void {
    if (this.book == undefined) {
      return;
    }
    this.bookService.deleteBook(this.book).then((data) => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
