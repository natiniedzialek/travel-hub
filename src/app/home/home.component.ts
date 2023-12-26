import { Component, OnInit } from '@angular/core';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip';
import { CurrencyService } from '../core/services/currency.service';
import { FilterService } from '../core/services/filter.service';
import { Filter } from '../core/models/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trips: Trip[] = [];
  currencyCode: string = this.currencyService.getCurrency();
  placesLeft: any;
  appliedFilter!: Filter;

  constructor(
    private tripService: TripService,
    private currencyService: CurrencyService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getPlacesLeft();
    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });
    this.filterService.filter$.subscribe((filter) => {
      this.appliedFilter = filter;
      this.getTrips();
    });
  }

  private getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips = data;
    });
  }

  public setTrips(trips: Trip[]): void {
    this.trips = trips;
  }

  private getPlacesLeft(): void {
    this.placesLeft = this.tripService.getPlacesLeft();
  }

  getMaxPrice(): number {
    return Math.max(...this.trips.map(trip => trip.unitPrice));
  }

  getMinPrice(): number {
    return Math.min(...this.trips.map(trip => trip.unitPrice));
  }

  getReservations(tripName: string): number {
    return this.tripService.getReservations(tripName);
  }

  handlePlusClick(tripName: string): void {
    this.tripService.addReservation(tripName);
  }

  handleMinusClick(tripName: string): void {
    this.tripService.removeReservation(tripName);
  }

  handleRemoveClick(tripName: string): void {
    this.tripService.removeTrip(tripName);
  }
}