import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../shared/services/products/products.service';
import { Product } from '../models/product';
import { FilterByCategoryService } from '../shared/services/products/filters/filter-by-category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: {
    isLoading: boolean;
    data: Product[];
  } = {
    isLoading: true,
    data: [],
  };
  constructor(
    private productsService: ProductsService,
    private categoriesService: FilterByCategoryService,
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts();
    this.categoriesService.categoryMessage$.subscribe((res) => {
      console.log(res);
      this.getProducts();
    });
  }
  getProducts() {
    this.productsService.products.subscribe((res) => {
      this.products = {
        isLoading: false,
        data: res,
      };
      console.log(res);
    });
  }

  getRandomPurchasedCount() {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Scale the random decimal to the desired range (1 to 10000)
    const randomNumber = Math.floor(randomDecimal * 10000) + 1;

    return randomNumber.toString();
  }
}
