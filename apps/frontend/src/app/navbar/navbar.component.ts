import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth/auth.service';
import { CartService } from '../shared/services/cart/cart.service';
import { FilterByCategoryService } from '../shared/services/products/filters/filter-by-category.service';
import { ProductsService } from '../shared/services/products/products.service';

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
export class NavbarComponent implements OnInit, OnChanges {
  categories: string[] = [];
  isLoading: boolean = true;
  selectedCategory: string | null = null;
  profileLinks = ['profile', 'orders', 'delivered', 'track orders', 'logout'];
  cartQuantity: number = 0;
  isLoggedIn: boolean = false;
  constructor(
    private productsService: ProductsService,
    public categoriesService: FilterByCategoryService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.subscribeToAuthenticatedMessage();
  }
  ngOnChanges(_changes: SimpleChanges): void {
    console.log('a');
  }
  subscribeToAuthenticatedMessage() {
    this.authService.authenticatedMessage$.subscribe((res) => {
      this.isLoggedIn = res;
      if (res) {
        this.cartService.getCart(1);
        this.cartService.cartSource$.subscribe((res1) => {
          if (res1) {
            this.cartQuantity = res1.products.length;
          }
        });
      }
    });
  }
  fetchCategories(e: MouseEvent) {
    e.preventDefault();
    this.productsService.getAllProductsCategories().subscribe(
      (res) => {
        this.categories = ['all', ...res];
        this.isLoading = false;
      },
      (e) => {
        console.log('error: ', e);
        this.isLoading = false;
      },
    );
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
  handleProfile(event: MouseEvent, profile: string) {
    event.preventDefault();
    switch (profile) {
      case 'logout': {
        // TODO: make backend request for logout
        this.router.navigate(['', 'login']);
        this.authService.logout();
        break;
      }
      default: {
        console.log('not handled', profile);
      }
    }
  }
}
