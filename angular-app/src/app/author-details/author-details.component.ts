import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../author';
import { AuthorService } from '../author.service';


@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author: Author | undefined;
  authorService: AuthorService = inject(AuthorService);

  constructor(private route: ActivatedRoute, private location: Location) {
    this.getAuthor();
  }

  getAuthor(): void {
    let num : any = this.route.snapshot.params['num'];
    if (num == null) {
      return undefined;
    }
    num = +num;
    this.authorService.getAuthor(num).then((auth: Author) => this.author = auth);
  }

  update(): void {
    if (this.author == undefined) {
      return;
    }
    this.authorService.updateAuthor(this.author).then((data) => {
      console.log(data);
      this.goBack();
    });
  }

  delete(): void {
    if (this.author == undefined) {
      return;
    }
    this.authorService.deleteAuthor(this.author).then((data) => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
