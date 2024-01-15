import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { CommonModule } from '@angular/common';
import { FilterByCategoryService } from '../services/products/filters/filter-by-category.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(
    private productsService: ProductsService,
    public categoriesService: FilterByCategoryService,
  ) {}
  ngOnInit(): void {}
  fetchCategories(e: MouseEvent) {
    e.preventDefault();
    this.productsService.getAllProductsCategories().subscribe((res) => {
      this.categories = {
        isLoading: false,
        data: res,
      };
    });
  }
  handleCategory(event: MouseEvent, category: string) {
    event.preventDefault();
    this.productsService.getProducts();
    this.categoriesService.updateSelectedCategory(category);
    console.log(category);
  }
}
