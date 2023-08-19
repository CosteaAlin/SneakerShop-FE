import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './checkout/order.model';
import { Observable } from 'rxjs/internal/Observable';
import { OrderResponse } from './checkout/orderResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/order'; 
  constructor(private http: HttpClient) {}

  placeOrder(orderRequest: Order): Observable<OrderResponse> {
    const url = `${this.apiUrl}/add`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<OrderResponse>(`${this.apiUrl}/add`, orderRequest, httpOptions);
  }
}
