import { TestBed } from '@angular/core/testing';

import { FirestoreOrderService } from './firestore-order.service';

describe('FirestoreOrderService', () => {
  let service: FirestoreOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
