import { TestBed } from '@angular/core/testing';

import { FirestoreTripService } from './firestore-trip.service';

describe('FirestoreTripService', () => {
  let service: FirestoreTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
