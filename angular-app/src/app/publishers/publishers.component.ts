import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Publisher } from '../publisher';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publishers',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.css'
})
export class PublishersComponent {
  publishers: Publisher[] = [];
  selectedPublisher: Publisher | null = null;
  publisherService: PublisherService = inject(PublisherService);
  

  constructor() {
    this.publisherService.getPublishers().then((pubs: Publisher[]) => this.publishers = pubs);
  }

  onSelect(publisher: Publisher): void {
    this.selectedPublisher = publisher;
  }

}
