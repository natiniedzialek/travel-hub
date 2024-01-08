import { Component } from '@angular/core';
import {ReservationService} from "../core/services/reservation.service";
import {Reservation} from "../core/models/reservation";
import {OrderService} from "../core/services/order.service";
import {TripService} from "../core/services/trip.service";
import {CurrencyService} from "../core/services/currency.service";
import {Trip} from "../core/models/trip";
import {map} from "rxjs/operators";
import {combineLatest, Observable, zip} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  reservations$ = this.reservationService.getReservations();
  reservations: Reservation[];
  currencyCode: string = this.currencyService.getCurrency();
  trips$: Observable<Trip[]> = this.tripService.getTrips();
  trips: Trip[];
  total: number;

  constructor(
    private tripService: TripService,
    private reservationService: ReservationService,
    private orderService: OrderService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });

    this.trips$.subscribe((trips: Trip[]) => {
      this.trips = trips;
    });

    this.reservations$.subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      this.total = this.getTotal();
    });

    zip(this.trips$, this.reservations$).subscribe(
        ([trips, reservations]) => {
          this.trips = trips;
          this.reservations = reservations;
          this.total = this.getTotal();
        });
  }

  private getTotal(): number {
    if(this.reservations === undefined || this.trips === undefined) return 0;
    return this.reservations
        .filter((reservation: Reservation) => reservation.selected)
        .reduce((total: number, reservation: Reservation) => {
          const trip = this.trips.find((trip: Trip) => trip.id === reservation.tripId);
          return total + trip.unitPrice * reservation.count;
        }, 0);
  }

  handlePlusClick(tripId: string): void {
    this.reservationService.addOneReservation(tripId);
  }

  handleMinusClick(tripId: string): void {
    this.reservationService.deleteOneReservation(tripId);
  }

  handleOrderClick(): void {
    console.log("Order clicked!")
    // this.orderService.addOrder(new Order());
  }

  getReservationCount(tripId: string): number {
      if (this.reservations !== undefined) {
        const reservation = this.reservations.find((r: Reservation) => r.tripId === tripId);
        return reservation ? reservation.count : 0;
      }
      return 0;
  }

  getReservation(tripId: string): Reservation {
    return this.reservations.find((r: Reservation) => r.tripId === tripId);
  }

  toggleSelection(tripId: string): void {
    const reservation = this.reservations.find((r: Reservation) => r.tripId === tripId);
    if (reservation.selected){
        this.reservationService.unselectReservation(tripId);
    } else {
        this.reservationService.selectReservation(tripId);
    }
  }
}
