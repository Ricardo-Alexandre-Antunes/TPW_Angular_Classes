import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../author';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  authors: Author[] = [];
  selectedAuthor: Author | null = null;
  authorService: AuthorService = inject(AuthorService);
  

  constructor() {
    this.authorService.getAuthors().then((auths: Author[]) => this.authors = auths);
  }

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }


}
