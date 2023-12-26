import { Component } from '@angular/core';
import { TripService } from '../../../core/services/trip.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  cartPrice$: number = 0;
  basketCount$: number = 0;
  private userId = 1;
  currencyCode: string = this.currencyService.getCurrency();

  constructor(
    private tripService: TripService,
    private router: Router,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });
  }

  getCartNumber(): number {
    return this.tripService.getReservationNumber();
  }

  getCartValue(): number {
    return this.tripService.getReservationValue();
  }

  handleBasketClick(): void {
    this.router.navigate(['/cart', this.userId]);
  }
}
