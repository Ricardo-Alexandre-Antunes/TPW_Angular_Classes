import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/ws';
  constructor() { }

  async getBook(id: number): Promise<Book> {
    const url = `${this.baseUrl}/book?id=${id}`;
    const response = await fetch(url);
    console.log(response);
    return await response.json() ?? undefined;
  }

  async getBooks(): Promise<Book[]> {
    const url = `${this.baseUrl}/books`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async getBooksN(num: number): Promise<Book[]> {
    const url = `${this.baseUrl}/books?num=${num}`;
    const response = await fetch(url);
    return await response.json() ?? [];
  }

  async createBook(bk: Book): Promise<any> {
    const url = `${this.baseUrl}/bookcre`;
    console.log(JSON.stringify(bk));
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bk)
    });
    return await response.json();
  }

  async updateBook(bk: Book): Promise<any> {
    const url = `${this.baseUrl}/bookupd`;
    // change the author list and book list to only ids
    console.log(JSON.stringify(bk));
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bk)
    });
    return await response.json();
  }

  async deleteBook(bk: Book): Promise<any> {
    const url = `${this.baseUrl}/bookdel/${bk.id}`;
    const response = await fetch(url, { method: 'DELETE' });
    return await response.text();
  }
}
