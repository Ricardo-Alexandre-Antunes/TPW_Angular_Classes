import { Injectable } from '@angular/core';
import { Publisher } from './publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private baseUrl = 'http://localhost:8080/ws';

  constructor() { }

  async getPublisher(id: number): Promise<Publisher> {
    const url = `${this.baseUrl}/publisher?id=${id}`;
    const response = await fetch(url);
    return await response.json() ?? undefined;
  }

  async getPublishers(): Promise<Publisher[]> {
    const url = `${this.baseUrl}/publishers`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async getPublishersN(num: number): Promise<Publisher[]> {
    const url = `${this.baseUrl}/publishers?num=${num}`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async createPublisher(pub: Publisher): Promise<any> {
    const url = `${this.baseUrl}/publishercre`;
    console.log(JSON.stringify(pub));
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pub)
    });
    return await response.json();
  }

  async updatePublisher(pub: Publisher): Promise<any> {
    const url = `${this.baseUrl}/publisherupd`;
    console.log(JSON.stringify(pub));
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pub)
    });
    return await response.json();
  }

  async deletePublisher(pub: Publisher): Promise<any> {
    const url = `${this.baseUrl}/publisherdel/${pub.id}`;
    const response = await fetch(url, { method: 'DELETE' });
    return await response.text();
  }
}
