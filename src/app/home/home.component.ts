import { Component, OnInit } from '@angular/core';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip';
import { CurrencyFormatPipe } from '../core/pipes/currency-format.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trips: Trip[] = [];
  selectedCurrencyCode: string = 'PLN';
  placesLeft: any;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.getTrips();
    this.getPlacesLeft();
  }

  private getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips = data;
    });
  }

  private getPlacesLeft(): void {
    this.placesLeft = this.tripService.getPlacesLeft();
  }

  getMaxPrice(): number {
    console.log(Math.max(...this.trips.map(trip => trip.unitPrice)))
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
}