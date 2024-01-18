import { Injectable } from '@angular/core';
import { Adapter } from './adpater';
import { IProduct } from '../interfaces/product.interface';

export class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public discountPercentage: number,
    public rating: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string,
    public images: string[],
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class ProductAdapter implements Adapter<Product> {
  adapt(product: IProduct) {
    return new Product(
      product.id,
      product.title,
      product.description,
      product.price,
      product.discountPercentage,
      product.rating,
      product.stock,
      product.brand,
      product.category,
      product.thumbnail,
      product.images,
    );
  }
}
