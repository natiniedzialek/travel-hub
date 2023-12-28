import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripModalComponent } from './add-trip-modal.component';

describe('AddTripModalComponent', () => {
  let component: AddTripModalComponent;
  let fixture: ComponentFixture<AddTripModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTripModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
