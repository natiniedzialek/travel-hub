import { Component } from '@angular/core';
import { TripService } from '../../../core/services/trip.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  basketCount$: number = 0;
  private userId = 1;

  constructor(
    private tripService: TripService,
    private router: Router
  ) { }

  getBasketValue(): number {
    return this.tripService.getReservationValue();
  }

  handleBasketClick(): void {
    this.router.navigate(['/cart', this.userId]);
  }
}
