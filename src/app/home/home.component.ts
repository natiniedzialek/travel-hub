import { Component, OnInit } from '@angular/core';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip';
import { CurrencyService } from '../core/services/currency.service';
import { FilterService } from '../core/services/filter.service';
import { Filter } from '../core/models/filter';
import { Observable, map, of } from 'rxjs';
import { ReservationService } from '../core/services/reservation.service';
import { Reservation } from '../core/models/reservation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trips$ = this.tripService.getTrips();
  trips: Trip[];
  reservationsCount: { [key: string]: number } = {};
  currencyCode: string = this.currencyService.getCurrency();
  maxPrice: number;
  minPrice: number;
  appliedFilter!: Filter;

  constructor(
    private tripService: TripService,
    private reservationService: ReservationService,
    private currencyService: CurrencyService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });
    this.filterService.filter$.subscribe((filter) => {
      this.appliedFilter = filter;
      this.getTrips();
    });
    this.trips$.subscribe((trips: Trip[]) => {
      this.trips = trips;
    });
    this.trips$.pipe(
      map((trips) => trips.map((trip) => trip.unitPrice)),
      map((prices) => prices.length > 0 ? Math.max(...prices) : 0)
    )
      .subscribe((maxPrice) => {
        this.maxPrice = maxPrice;
      });
    this.trips$.pipe(
      map((trips) => trips.map((trip) => trip.unitPrice)),
      map((prices) => prices.length > 0 ? Math.min(...prices) : 0)
    )
      .subscribe((minPrice) => {
        this.minPrice = minPrice;
      });
    this.getReservations();
  }

  private getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips$ = data;
    });
  }

  getReservations(): void {
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

  handleRemoveClick(tripId: string) {
    this.tripService.deleteTrip(tripId);
  }
}