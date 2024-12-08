import { Injectable } from '@angular/core';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'http://localhost:8080/ws';

  constructor() { }

  async getAuthor(id: number): Promise<Author> {
    const url = `${this.baseUrl}/author?id=${id}`;
    const response = await fetch(url);
    return await response.json() ?? undefined;
  }

  async getAuthors(): Promise<Author[]> {
    const url = `${this.baseUrl}/authors`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async getAuthorsN(num: number): Promise<Author[]> {
    const url = `${this.baseUrl}/authors?num=${num}`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async createAuthor(au: Author): Promise<any> {
    const url = `${this.baseUrl}/authorcre`;
    console.log(JSON.stringify(au));
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(au)
    });
    return await response.json();
  }

  async updateAuthor(au: Author): Promise<any> {
    const url = `${this.baseUrl}/authorupd`;
    console.log(JSON.stringify(au));
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(au)
    });
    return await response.json();
  }

  async deleteAuthor(au: Author): Promise<any> {
    const url = `${this.baseUrl}/authordel/${au.id}`;
    const response = await fetch(url, { method: 'DELETE' });
    return await response.text();
  }
}
