import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cart, CartItem } from '../../models/cart';
import { Subject } from 'rxjs';

// TODO: use behaviour subject to store all the cart.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  BASE_URL = `${environment.apiBaseUrl}/carts`;
  private _cart = new Subject<Cart | null>();
  cartSource$ = this._cart.asObservable();
  constructor(private httpClient: HttpClient) {}
  getCart(id: number) {
    this.httpClient.get<Cart>(`${this.BASE_URL}/${id}`).subscribe((res) => {
      this._cart.next(res);
    });
  }
  get cart() {
    return this._cart;
  }
  updateCart(cartId: string, product: { id: string; quantity: string }) {
    return this.httpClient.put<CartItem>(`${this.BASE_URL}/${cartId}`, {
      merge: true,
      products: [
        {
          ...product,
        },
      ],
    });
  }
}
