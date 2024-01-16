import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) cartItem!: CartItem;
  selectedCount: number = 0;
  product!: Product;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
  ) {}
  handleRemove() {}
  handleBuy() {}
  ngOnInit(): void {
    this.productService
      .getProduct(this.cartItem.id.toString())
      .subscribe((res) => {
        this.product = res;
      });
    this.selectedCount = this.cartItem.quantity;
  }
  increment() {
    if (this.selectedCount < this.product.stock) {
      this.selectedCount++;
      this.cartService
        .updateCart(this.cartItem.id.toString(), {
          id: this.cartItem.id.toString(),
          quantity: this.selectedCount.toString(),
        })
        .subscribe((res) => {
          this.cartItem = res;
        });
    }
  }
  decrement() {
    if (this.selectedCount > 0) {
      this.selectedCount--;
    }
  }
}
