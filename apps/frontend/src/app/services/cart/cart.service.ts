import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cart } from '../../models/cart';

// TODO: use behaviour subject to store all the cart.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  BASE_URL = `${environment.apiBaseUrl}/carts`;
  constructor(private httpClient: HttpClient) {}
  getCart(id: number) {
    return this.httpClient.get<Cart>(`${this.BASE_URL}/${id}`);
  }
}
