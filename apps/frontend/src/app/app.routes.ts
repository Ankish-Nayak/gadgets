import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Login1Component } from './auth/login1/login1.component';
import { authGuard } from './shared/guards/auth.guard';
//TODO: implement auth guard
export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login1Component,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
];
