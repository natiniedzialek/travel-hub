import { Component } from '@angular/core';
import { FilterModalComponent } from '../../../filter-modal/filter-modal.component';
import { AddTripModalComponent } from '../../../add-trip-modal/add-trip-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyService } from '../../../core/services/currency.service';
import {Trip} from "../../../core/models/trip";
import {FirestoreOrderService} from "../../../core/services/firestore/firestore-order.service";
import {Order} from "../../../core/models/order";
import {FirestoreTripService} from "../../../core/services/firestore/firestore-trip.service";
import { Observable} from "rxjs";
import {RestOrderService} from "../../../core/services/rest/rest-order.service";
import {RestTripService} from "../../../core/services/rest/rest-trip.service";
import {Database, DatabaseInfoService} from "../../../core/services/database-info.service";
import {TripService} from "../../../core/services/interface/trip.service";
import {OrderService} from "../../../core/services/interface/order.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  userId: string = "65a47a7b26d03db5c32b3dcb";
  trips$: Observable<Trip[]>;
  trips: Trip[];
  orders$: Observable<Order[]>;
  orders: Order[] = [];
  upcomingTrip: Trip;

    tripService: TripService;
    orderService: OrderService;

  constructor(
    private dialog: MatDialog,
    private databaseInfoService: DatabaseInfoService,
    private currencyService: CurrencyService,
    private firestoreOrderService: FirestoreOrderService,
    private restOrderService: RestOrderService,
    private firestoreTripService: FirestoreTripService,
    private restTripService: RestTripService
  ) {}

  ngOnInit(): void {
      this.databaseInfoService.database$.subscribe((currentDatabase: Database) => {
          switch (currentDatabase) {
              case Database.Firestore:
                  this.tripService = this.firestoreTripService;
                  this.orderService = this.firestoreOrderService;
                  break;
              case Database.Mongo:
                  this.tripService = this.restTripService;
                  this.orderService = this.restOrderService;
                  break;
          }
      });

      this.trips$ = this.tripService.getTrips();
      this.trips$.subscribe((trips: Trip[]) => {
          this.trips = trips;
      });

      this.orders$ = this.orderService.getOrders(this.userId);
      this.orders$.subscribe((orders: Order[]) => {
          this.orders = orders;
          this.upcomingTrip = this.getUpcomingTrip();
      });
  }

  changeDatabase(): void {
      this.databaseInfoService.changeDatabase();
  }

  getUpcomingTrip(): Trip | null {
      if(this.orders === undefined || this.trips === undefined) return null;
      if (this.orders.length === 0) return null;
      const tripIds = this.orders
          .map((order: Order) => order.tripId);
      const orderedTrips = this.trips.filter((trip: Trip) => tripIds.includes(trip._id));
      const sortedTrips = orderedTrips.filter((trip: Trip) => new Date(trip.startDate) > new Date())
          .sort((a, b) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getTime() - dateB.getTime();
      });
      if (sortedTrips.length > 0 && new Date(sortedTrips[0].startDate) < new Date(new Date().setDate(new Date().getDate() + 7))) {
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
