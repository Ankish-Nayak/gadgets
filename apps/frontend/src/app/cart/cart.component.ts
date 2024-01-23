import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product-list/product/product.component';
import { Cart } from '../shared/models/cart.model';
import { CartItem } from '../shared/models/cartItem.model';
import { AuthService } from '../shared/services/auth/auth.service';
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
  isLoading: boolean = true;
  cart!: Cart;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.getUserCart();
    this.subscribeToCart();
  }
  getUserCart() {
    this.authService.me().subscribe((res) => {
      this.cartService.getCart(res.id);
    });
  }
  subscribeToCart() {
    this.cartService.cartSource$.subscribe(
      (res) => {
        if (res !== null) {
          this.cart = res;
          this.products = res.products;
        }
        this.isLoading = false;
      },
      (e) => {
        this.isLoading = false;
        console.log('error:', e);
      },
    );
  }
}
