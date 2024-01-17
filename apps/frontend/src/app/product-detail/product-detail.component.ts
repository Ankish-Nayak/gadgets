import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products/products.service';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { randomNumber } from './randomNumber';
import { ProductOutletComponent } from './product-outlet/product-outlet.component';
import { aboutThisItem, cardOffers, cardServices } from './mock-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbRatingModule,
    ProductOutletComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product = {} as Product;
  id: string | null = null;
  images: string[] = [];
  wordWrap: boolean = true;
  selectCount: number = 0;
  purchaseCount: number = 0;
  cardOffers: {
    title: string;
    description: string;
    offersCount: number;
  }[] = cardOffers;

  cardServices: {
    class: string;
    description: string;
  }[] = cardServices;

  aboutThisItem: string[] = aboutThisItem;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id !== null) {
        this.productsService.getProduct(this.id).subscribe((res) => {
          this.product = res;
          this.images = res.images;
        });
      }
    });
  }
  increment() {
    if (this.selectCount < this.product.stock) {
      this.selectCount++;
    }
  }
  decrement() {
    if (this.selectCount > 0) {
      this.selectCount--;
    }
  }
}
