import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products/products.service';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { randomNumber } from './randomNumber';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, NgbRatingModule],
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
  }[] = [
    {
      title: 'NoCostEmi',
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing mini sint cillum sint consectetur cupidatat',
      offersCount: randomNumber(5),
    },
    {
      title: 'NoCostEmi',
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing mini sint cillum sint consectetur cupidatat',

      offersCount: randomNumber(5),
    },
    {
      title: 'NoCostEmi',
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing mini sint cillum sint consectetur cupidatat',

      offersCount: randomNumber(5),
    },
  ];

  cardServices: {
    class: string;
    description: string;
  }[] = [
    {
      class: 'bi bi-truck',
      description: 'delivered with 7 days',
    },
    {
      class: 'bi bi-award',
      description: 'one year warrenty',
    },
    {
      class: 'bi bi-credit-card-2-front',
      description: 'pay on delivery',
    },
    {
      class: 'bi bi-truck',
      description: 'delivered with 7 days',
    },
  ];
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
