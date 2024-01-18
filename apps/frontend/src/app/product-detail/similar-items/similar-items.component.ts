import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../../shared/services/products/products.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { randomNumber } from '../randomNumber';

@Component({
  selector: 'app-similar-items',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, RouterLink],
  templateUrl: './similar-items.component.html',
  styleUrl: './similar-items.component.css',
})

// TODO: add price.
// TODO: add ratings with star and count of person rated it.
export class SimilarItemsComponent implements OnInit, OnChanges {
  @Input({ required: true }) category!: string;
  purchasedCount = randomNumber(1000);
  items!: Product[];
  displayItems: Product[] = [];
  left: number = 0;
  right: number = 4;
  span: number = 4;
  totalPages: number = 0;
  constructor(private productServices: ProductsService) {}
  ngOnInit(): void {
    this.productServices
      .getProductByCategory(this.category)
      .subscribe((res) => {
        this.items = res.products;
        console.log(this.category, res);
      });
  }
  ngOnChanges(_changes: SimpleChanges): void {
    this.productServices
      .getProductByCategory(this.category)
      .subscribe((res) => {
        for (let i = 0; i < 4; ++i) {
          for (let product of res.products) {
            this.items.push(product);
          }
        }
        console.log(this.category, res);
        this.totalPages = this.items.length;
        this.render();
      });
  }
  render() {
    this.displayItems = [];
    for (let i = this.left; i <= this.right; ++i) {
      this.displayItems.push(this.items[i]);
    }
  }
  moveLeft() {
    if (this.left > 0) {
      // this.left = ;
    } else {
    }
  }
  moveRight() {}
}
