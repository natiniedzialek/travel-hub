import { Component } from '@angular/core';
import { FilterModalComponent } from '../../../filter-modal/filter-modal.component';
import { AddTripModalComponent } from '../../../add-trip-modal/add-trip-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyService } from '../../../core/services/currency.service';
import {Trip} from "../../../core/models/trip";
import {OrderService} from "../../../core/services/order.service";
import {Order} from "../../../core/models/order";
import {TripService} from "../../../core/services/trip.service";
import { Observable} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  userId: string = "1";
  trips$: Observable<Trip[]> = this.tripService.getTrips();
  trips: Trip[];
  orders$: Observable<Order[]> = this.orderService.getOrders(this.userId);
  orders: Order[] = [];
  upcomingTrip: Trip;

  constructor(
    private dialog: MatDialog,
    private currencyService: CurrencyService,
    private orderService: OrderService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
      this.trips$.subscribe((trips: Trip[]) => {
          this.trips = trips;
      });
      this.orders$.subscribe((orders: Order[]) => {
          this.orders = orders;
          this.upcomingTrip = this.getUpcomingTrip();
      });
  }

  getUpcomingTrip(): Trip | null {
      if(this.orders === undefined || this.trips === undefined) return null;
      if (this.orders.length === 0) return null;
      const tripIds = this.orders
          .map((order: Order) => order.tripId);
      const orderedTrips = this.trips.filter((trip: Trip) => tripIds.includes(trip.id));
      const sortedTrips = orderedTrips.filter((trip: Trip) => new Date(trip.startDate) > new Date())
          .sort((a, b) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getTime() - dateB.getTime();
      });
      if (new Date(sortedTrips[0].startDate) < new Date(new Date().setDate(new Date().getDate() + 7))) {
          return sortedTrips[0];
      }
      return null;
  }

  openAddTripModal(): void {
    const dialogRef = this.dialog.open(AddTripModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openFilterModal(): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  setCurrency(currency: string): void {
    this.currencyService.setCurrency(currency);
  }
}
