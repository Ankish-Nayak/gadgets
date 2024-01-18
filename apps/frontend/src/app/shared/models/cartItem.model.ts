import { Injectable } from '@angular/core';
import { Adapter } from './adpater';
import { ICartItem } from '../interfaces/cart.interface';

export class CartItem {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public quantity: number,
    public total: number,
    public discountPercentage: number,
    public discountedPrice: number,
    public thumbnail: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class CartItemAdapter implements Adapter<CartItem> {
  adapt(item: ICartItem): CartItem {
    return new CartItem(
      item.id,
      item.title,
      item.price,
      item.quantity,
      item.total,
      item.discountPercentage,
      item.discountedPrice,
      item.thumbnail,
    );
  }
}
