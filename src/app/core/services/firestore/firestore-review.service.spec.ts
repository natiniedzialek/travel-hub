import { TestBed } from '@angular/core/testing';

import { FirestoreReviewService } from './firestore-review.service';

describe('FirestoreReviewService', () => {
  let service: FirestoreReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
