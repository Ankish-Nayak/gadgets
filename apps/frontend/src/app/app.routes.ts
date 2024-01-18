import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
//TODO: implement auth guard
export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'singup',
    component: SignupComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];
