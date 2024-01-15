import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  wordWrap: boolean = true;
  constructor() {}
  handleSeeMore() {
    this.wordWrap = !this.wordWrap;
    console.log('clicked', this.wordWrap);
  }
}
