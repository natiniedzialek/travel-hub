import { TestBed } from '@angular/core/testing';

import { RestReservationService } from './rest-reservation.service';

describe('RestReservationService', () => {
  let service: RestReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
