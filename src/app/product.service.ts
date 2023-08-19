import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/products'; 
  constructor(private http: HttpClient) {}

  getProductsByGender(gender: string): Observable<Product[]> {
    const url = `${this.apiUrl}` + "/gender";
    let genderValue = (gender === 'men') ? "MAN" : "WOMAN";
    const params = new HttpParams().set('gender', genderValue);
    return this.http.get<Product[]>(url, {params});
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }
}
