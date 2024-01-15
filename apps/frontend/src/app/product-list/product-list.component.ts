import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../models/product';
import { FilterByCategoryService } from '../services/products/filters/filter-by-category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
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
      this.products = res;
      console.log(res);
    });
  }
}
