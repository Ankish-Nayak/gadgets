import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortByPriceService {
  private _sortByPrice = new BehaviorSubject<'asc' | 'dsc'>('asc');
  sortByPriceSource$ = this._sortByPrice.asObservable();
  constructor() {}
  get selectedCategory() {
    return this._sortByPrice.value;
  }
  updateSortByPrice(sortBy: 'asc' | 'dsc') {
    this._sortByPrice.next(sortBy);
  }
  resetSelectedCategory() {
    this._sortByPrice.next('asc');
  }
}
