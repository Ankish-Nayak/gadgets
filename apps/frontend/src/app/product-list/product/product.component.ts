import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product';

// TODO: open shortpop when hovered over rating to show distribution of rating just like amazon hover link response

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    PercentPipe,
    RouterLink,
    CommonModule,
    NgbRatingModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) purchasedCount!: string;
  wordWrap: boolean = true;
  stars: string[] = [];
  constructor() {}
  handleSeeMore() {
    this.wordWrap = !this.wordWrap;
    console.log('clicked', this.wordWrap);
  }
}
