import { TestBed } from '@angular/core/testing';

import { RestOrderService } from './rest-order.service';

describe('RestOrderService', () => {
  let service: RestOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
