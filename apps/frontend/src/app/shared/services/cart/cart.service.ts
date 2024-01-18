import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ICart, ICartItem } from '../../interfaces/cart.interface';
import { CartItemAdapter } from '../../models/cartItem.model';

// TODO: use behaviour subject to store all the cart.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  BASE_URL = `${environment.apiBaseUrl}/carts`;
  private _cart = new Subject<ICart | null>();
  cartSource$ = this._cart.asObservable();
  constructor(
    private httpClient: HttpClient,
    private adapter: CartItemAdapter,
  ) {}
  getCart(id: number) {
    this.httpClient.get<ICart>(`${this.BASE_URL}/${id}`).subscribe((res) => {
      this._cart.next(res);
    });
  }
  get cart() {
    return this._cart.pipe(
      map((res) => {
        if (res !== null) {
          return {
            ...res,
            products: res.products.map((product) =>
              this.adapter.adapt(product),
            ),
          };
        } else {
          return null;
        }
      }),
    );
  }
  updateCart(cartId: string, product: { id: string; quantity: string }) {
    return this.httpClient.put<ICartItem>(`${this.BASE_URL}/${cartId}`, {
      merge: true,
      products: [
        {
          ...product,
        },
      ],
    });
  }
}
