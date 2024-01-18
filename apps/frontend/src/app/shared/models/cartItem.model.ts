export class CartItem {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public quantity: number,
    public total: number,
    public discountPercentage: number,
    public discountedPrice: number,
    public thumbnail: string,
  ) {}
}
