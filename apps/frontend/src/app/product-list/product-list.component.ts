import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { FilterByCategoryService } from '../shared/services/products/filters/filter-by-category.service';
import { ProductsService } from '../shared/services/products/products.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  purchasedCount: string[] = [];
  isLoading: boolean = true;
  constructor(
    private productsService: ProductsService,
    private categoriesService: FilterByCategoryService,
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts();
    this.categoriesService.categoryMessage$.subscribe(
      (res) => {
        console.log(res);
        this.getProducts();
      },
      (e) => {
        console.log(e);
      },
      () => {
        this.isLoading = false;
      },
    );
  }
  populatePurchasedCount() {
    for (let i = 0; i < this.products.length; ++i) {
      this.purchasedCount.push(this.getRandomPurchasedCount());
    }
  }
  getProducts() {
    this.productsService.products.subscribe(
      (res) => {
        this.products = res;
        this.isLoading = false;
        this.populatePurchasedCount();
      },
      (e) => {
        this.isLoading = false;
        console.log('Error: ', e);
      },
    );
  }

  getRandomPurchasedCount() {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Scale the random decimal to the desired range (1 to 10000)
    const randomNumber = Math.floor(randomDecimal * 10000) + 1;

    return randomNumber.toString();
  }
}
