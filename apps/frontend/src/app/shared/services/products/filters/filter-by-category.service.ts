import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterByCategoryService {
  private _selectedCategorySource = new BehaviorSubject<string | null>(null);
  categoryMessage$ = this._selectedCategorySource.asObservable();
  constructor() {}
  get selectedCategory() {
    return this._selectedCategorySource.value;
  }
  updateSelectedCategory(selectedCategory: string | null) {
    this._selectedCategorySource.next(selectedCategory);
  }
  resetSelectedCategory() {
    this._selectedCategorySource.next(null);
  }
}
