import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { OrderResponse } from '../models/OrderResponse';
import { SearchResponse } from '../models/SearchResponse';

const BASE_URL = "http://localhost:8080/apis/authenticate";

const ORDER = "http://localhost:8080/order/search";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient) { }

  doLogin(request: LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(BASE_URL , request);
  }

  dashboard(emptyList: any[] = []): Observable<SearchResponse<OrderResponse>> {
    return this.http.post<SearchResponse<OrderResponse>>(ORDER, emptyList);
  }


}
