import { TestBed } from '@angular/core/testing';

import { RestTripService } from './rest-trip.service';

describe('RestTripService', () => {
  let service: RestTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
