import { Injectable } from '@angular/core';
import { CartItem } from './cartItem.model';

import { Adapter } from './adpater';
import { ICart } from '../interfaces/cart.interface';

export class Cart {
  constructor(
    public id: number,
    public products: CartItem[],
    public total: number,
    public discountedTotal: number,
    public userId: number,
    public totalProducts: number,
    public totalQuantity: number,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class CartAdapter implements Adapter<Cart> {
  adapt(cart: ICart) {
    const products = cart.products.map(
      (product) =>
        new CartItem(
          product.id,
          product.title,
          product.price,
          product.quantity,
          product.total,
          product.discountPercentage,
          product.discountedPrice,
          product.thumbnail,
        ),
    );
    return new Cart(
      cart.id,
      products,
      cart.total,
      cart.discountedTotal,
      cart.userId,
      cart.totalProducts,
      cart.totalQuantity,
    );
  }
}
