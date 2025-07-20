import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ClientBasicDto {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
}

export interface Order {
  id: number;
  description: string;
  source: string;
  address: string;
  dateOrder: string;
  state: string;
  orderNumber: string;
  orderNumberTemporary: string;
  client: ClientBasicDto;
  canceled: boolean;
  active: boolean;
}

interface OrderResponse {
  searchCount: number;
  searchValue: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/orders/search';

  searchOrders(): Observable<Order[]> {
    return this.http.post<OrderResponse>(this.apiUrl, []).pipe(
      map(response => response.searchValue)
    );
  }
}
