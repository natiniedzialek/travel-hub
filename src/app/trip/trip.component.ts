import { Component } from '@angular/core';
import {TripService} from "../core/services/trip.service";
import { ActivatedRoute } from '@angular/router';
import {Trip} from "../core/models/trip";
import {CurrencyService} from "../core/services/currency.service";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  tripId: string;
  trip: Trip;
  currencyCode: string = this.currencyService.getCurrency();

  constructor(
      private route: ActivatedRoute,
      private tripService: TripService,
      private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tripId = params['tripId'];
    });

    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });

    this.tripService.getTrip(this.tripId).subscribe(trip => {
      this.trip = trip;
      console.log(trip);
    });
  }
}
