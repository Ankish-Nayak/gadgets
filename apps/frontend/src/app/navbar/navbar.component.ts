import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { CommonModule } from '@angular/common';
import { FilterByCategoryService } from '../services/products/filters/filter-by-category.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart/cart.service';

// TODO: make variable to render amount or cart item to display on cart badge.
// TODO: make separte component for showing complete detail about the product.
// TODO: introduce sort by price reviews and purchased amount.
// TODO: understand how to make add to cart and buy button work using dummyjson.com
// TODO: add modal while purchasing item for confirmation.

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  categories: {
    isLoading: boolean;
    data: string[];
  } = {
    isLoading: true,
    data: [],
  };
  selectedCategory: string | null = null;
  profileLinks = ['profile', 'orders', 'delivered', 'track orders'];
  cartQuantity: number = 0;
  constructor(
    private productsService: ProductsService,
    public categoriesService: FilterByCategoryService,
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.cartService.getCart(1);
    this.cartService.cartSource$.subscribe((res) => {
      if (res) {
        this.cartQuantity = res.products.length;
      }
    });
  }
  fetchCategories(e: MouseEvent) {
    e.preventDefault();
    this.productsService.getAllProductsCategories().subscribe((res) => {
      this.categories = {
        isLoading: false,
        data: ['all', ...res],
      };
    });
  }
  handleCategory(event: MouseEvent, category: string) {
    event.preventDefault();
    this.productsService.getProducts();
    if (category === 'all') {
      this.categoriesService.updateSelectedCategory(null);
    } else {
      this.categoriesService.updateSelectedCategory(category);
    }
    console.log(category);
  }
}
