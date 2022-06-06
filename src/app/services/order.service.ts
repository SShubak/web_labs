import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Order {
  id_medicine: number,
  id_user: number,
  amount: number,
  shipDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://127.0.0.1:5000/';

  constructor(
    private http: HttpClient
  ) {
  }

  makeOrder(data: Order) {
    return this.http.post(this.url + 'api/v1/pharmacy/orders', data);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.url + 'api/v1/pharmacy/user/ordersall/')
  }
}
