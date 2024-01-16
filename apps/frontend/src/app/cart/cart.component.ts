import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { ProductComponent } from '../product-list/product/product.component';
import { CartService } from '../services/cart/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';

// TODO: make price label to stick when scroll up.
// TODO: make remove button work so that items can removed from the cart.
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent, CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: {
    isLoading: boolean;
    data: CartItem[];
  } = {
    isLoading: true,
    data: [],
  };
  cart!: Cart;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCart(1);
    this.cartService.cart.subscribe((res) => {
      if (res !== null) {
        this.cart = res;
        this.products = {
          isLoading: false,
          data: res.products,
        };
      }
    });
  }
}
