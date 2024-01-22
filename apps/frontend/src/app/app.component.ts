import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    NavbarComponent,
    ProductListComponent,
    CartComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean = false;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.authService.authenticatedMessage$.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
