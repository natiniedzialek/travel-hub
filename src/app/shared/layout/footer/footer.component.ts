import { Component, Output, EventEmitter } from '@angular/core';
import { TripService } from '../../../core/services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  basketCount: number = 0;
  private userId = 1;

  constructor(
    private tripService: TripService,
    private router: Router
  ) { }

  updateBasketCount(newCount: number) {
    this.basketCount = newCount;
  }

  handleBasketClick() {
    this.router.navigate(['/cart', this.userId]);
  }
}
