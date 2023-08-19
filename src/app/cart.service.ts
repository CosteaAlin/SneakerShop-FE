import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart } from './cart/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8081/cart'; 
  private initialCartCount = Number(sessionStorage.getItem('cartItemsCount')) || 0;
  private cartCountSource = new BehaviorSubject<number>(this.initialCartCount);
  cartCount$ = this.cartCountSource.asObservable();

  updateCartCount(count: number): void {
    this.cartCountSource.next(count);
    sessionStorage.setItem('cartItemsCount', count.toString());
  }
  
  constructor(private http: HttpClient) {}

  updateCart(productId: number, size: number, quantity: number): Observable<Cart> {
    const url = `${this.apiUrl}/update`;
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('size', size.toString())
      .set('quantity', quantity.toString());
    return this.http.post<Cart>(url, null, { params, withCredentials: true });
  }

  getCart(): Observable<Cart> {
    const url = `${this.apiUrl}/session`;
    return this.http.get<Cart>(url, { withCredentials: true });
  }

  removeItemFromCart(productId: number, size: number): Observable<Cart> {
    const url = `${this.apiUrl}/delete-item`;
    const params = {
      productId: productId.toString(),
      size: size.toString()
    }
    return this.http.delete<Cart>(url, { params: params, withCredentials: true });
  }
}
