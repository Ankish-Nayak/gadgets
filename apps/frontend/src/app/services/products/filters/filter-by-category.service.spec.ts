import { TestBed } from '@angular/core/testing';

import { FilterByCategoryService } from './filter-by-category.service';

describe('FilterByCategoryService', () => {
  let service: FilterByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
