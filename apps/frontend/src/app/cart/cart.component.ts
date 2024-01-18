import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product-list/product/product.component';
import { Cart } from '../shared/models/cart.model';
import { CartItem } from '../shared/models/cartItem.model';
import { CartService } from '../shared/services/cart/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';

// TODO: make price label to stick when scroll up.
// TODO: make remove button work so that items can removed from the cart.
// TODO: integerate loaders to deal with loading state  https://blog.bitsrc.io/how-to-implement-a-global-loader-in-angular-df111a2c43d9
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent, CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: CartItem[] = [];
  cart!: Cart;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCart(1);
    this.cartService.cart.subscribe((res) => {
      if (res !== null) {
        this.cart = res;
        this.products = res.products;
      }
    });
  }
}
