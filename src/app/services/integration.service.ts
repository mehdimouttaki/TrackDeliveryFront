import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { OrderResponse } from '../models/OrderResponse';
import { SearchResponse } from '../models/SearchResponse';

const BASE_URL = "http://localhost:8080/apis/authenticate";
const ORDER_SEARCH_URL = "http://localhost:8080/order/search";
const ORDER_BASE_URL = "http://localhost:8080/orders";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient) { }

  doLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(BASE_URL , request);
  }

  dashboard(emptyList: any[] = []): Observable<SearchResponse<OrderResponse>> {
    return this.http.post<SearchResponse<OrderResponse>>(ORDER_SEARCH_URL, emptyList);
  }

  // هادي هي الميثود الناقصة لجلب طلب واحد حسب id
  getOrderById(orderId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${ORDER_BASE_URL}/${orderId}`);
  }


  // وهادي ميثود التحديث
  updateOrder(orderId: number, orderRequest: any): Observable<void> {
    return this.http.put<void>(`${ORDER_BASE_URL}/${orderId}`, orderRequest);
  }
}
