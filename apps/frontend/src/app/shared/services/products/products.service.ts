import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IProduct } from '../../interfaces/product.interface';
import { FilterByCategoryService } from './filters/filter-by-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  BASE_URL = `${environment.apiBaseUrl}/products`;
  private _products = new Subject<IProduct[]>();
  productsSource$ = this._products.asObservable();
  constructor(
    private httpClient: HttpClient,
    private categoriesService: FilterByCategoryService,
  ) {}
  ngOnInit(): void {
    this.categoriesService.categoryMessage$.subscribe(() => {
      this.getProducts();
    });
  }
  get products() {
    return this._products;
  }
  getProducts() {
    if (this.categoriesService.selectedCategory !== null) {
      this.httpClient
        .get<{
          products: IProduct[];
        }>(
          `${this.BASE_URL}/category/${this.categoriesService.selectedCategory}`,
        )
        .subscribe((res) => {
          this._products.next(res.products);
        });
    } else {
      this.httpClient
        .get<{ products: IProduct[] }>(`${this.BASE_URL}`)
        .subscribe((res) => {
          this._products.next(res.products);
        });
    }
  }
  getProduct(id: string) {
    return this.httpClient.get<IProduct>(`${this.BASE_URL}/${id}`);
  }
  addProduct(productData: IProduct) {
    return this.httpClient.post(`${this.BASE_URL}/add`, productData, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
  getAllProductsCategories() {
    return this.httpClient.get<string[]>(`${this.BASE_URL}/categories`);
  }
  getProductByCategory(category: string) {
    return this.httpClient.get<{
      products: IProduct[];
    }>(`${this.BASE_URL}/category/${category}`);
  }
}
