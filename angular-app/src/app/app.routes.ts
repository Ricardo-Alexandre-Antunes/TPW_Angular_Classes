import { Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { PublishersComponent } from './publishers/publishers.component';
import { BooksComponent } from './books/books.component';
import { TopComponent } from './top/top.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';

export const routes: Routes = [
    {path: '', redirectTo: '/top', pathMatch: 'full'},
    {path: 'authors', component: AuthorsComponent},
    {path: 'publishers', component: PublishersComponent},
    {path: 'books', component: BooksComponent},
    {path: 'top', component: TopComponent},
    {path: 'authordetails/:num', component: AuthorDetailsComponent},
    {path: 'bookdetails/:num', component: BookDetailsComponent},
    {path: 'publisherdetails/:num', component: PublisherDetailsComponent},
];
