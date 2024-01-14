import { Component } from '@angular/core';
import {FirestoreTripService} from "../core/services/firestore/firestore-trip.service";
import { ActivatedRoute } from '@angular/router';
import {Trip} from "../core/models/trip";
import {CurrencyService} from "../core/services/currency.service";
import {FirestoreReservationService} from "../core/services/firestore/firestore-reservation.service";
import {Reservation} from "../core/models/reservation";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  tripId: string;
  trip: Trip;
  currencyCode: string = this.currencyService.getCurrency();
  carouselImages: string[];
  reservationsCount: { [key: string]: number } = {};

  constructor(
      private route: ActivatedRoute,
      private tripService: FirestoreTripService,
      private currencyService: CurrencyService,
      private reservationService: FirestoreReservationService
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
      this.carouselImages = trip.images;
    });

    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservationsCount = {};
      reservations.forEach((reservation) => {
        this.reservationsCount[reservation.tripId] = reservation.count;
      });
    });
  }

  getReservationCount(tripId: string): number {
    return this.reservationsCount[tripId] || 0;
  }

  handlePlusClick(tripId: string): void {
    this.reservationService.addOneReservation(tripId);
  }

  handleMinusClick(tripId: string): void {
    this.reservationService.deleteOneReservation(tripId);
  }
}
