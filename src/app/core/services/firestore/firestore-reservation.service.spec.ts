import { TestBed } from '@angular/core/testing';

import { FirestoreReservationService } from './firestore-reservation.service';

describe('FirestoreReservationService', () => {
  let service: FirestoreReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
