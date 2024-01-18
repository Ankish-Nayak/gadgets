import { TestBed } from '@angular/core/testing';

import { SortByPriceService } from './sort-by-price.service';

describe('SortByPriceService', () => {
  let service: SortByPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortByPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
