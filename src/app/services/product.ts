import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private apiUrl = 'https://stock-api-ei9o.onrender.com';



  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: { name: string; price: number; quantity: number }) {
  return this.http.put(`${this.apiUrl}/${id}`, product);
}

deleteProduct(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
