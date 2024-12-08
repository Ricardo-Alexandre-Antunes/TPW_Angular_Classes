import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from '../publisher';
import { PublisherService } from '../publisher.service';


@Component({
  selector: 'app-publisher-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publisher-details.component.html',
  styleUrl: './publisher-details.component.css'
})
export class PublisherDetailsComponent {
  publisher: Publisher | undefined;
  publisherService: PublisherService = inject(PublisherService);

  constructor(private route: ActivatedRoute, private location: Location) {
    this.getpublisher();
  }

  getpublisher(): void {
    let num : any = this.route.snapshot.params['num'];
    if (num == null) {
      return undefined;
    }
    num = +num;
    this.publisherService.getPublisher(num).then((pub: Publisher) => this.publisher = pub);
  }

  update(): void {
    if (this.publisher == undefined) {
      return;
    }
    console.log(this.publisher);
    this.publisherService.updatePublisher(this.publisher).then((data) => {
      console.log(data);
      this.goBack();
    });
  }

  delete(): void {
    if (this.publisher == undefined) {
      return;
    }
    this.publisherService.deletePublisher(this.publisher).then((data) => {
      console.log(data);
      this.goBack();
    });
  }


  goBack(): void {
    this.location.back();
  }

}
