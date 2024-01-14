import { Component} from '@angular/core';
import {FirestoreTripService} from "../core/services/firestore/firestore-trip.service";
import {FirestoreOrderService} from "../core/services/firestore/firestore-order.service";
import {CurrencyService} from "../core/services/currency.service";
import {Trip} from "../core/models/trip";
import {Order} from "../core/models/order";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  currencyCode: string;
  trips: Trip[];
  userId: string = "1";
  orders: Order[];
  filteredTrips: Trip[];

  filterArchive: boolean = true;
  filterOngoing: boolean = true;
  filterUpcoming: boolean = true;

  constructor(
    private tripService: FirestoreTripService,
    private orderService: FirestoreOrderService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });

    this.tripService.getTrips().subscribe((trips: Trip[]) => {
      this.trips = trips;
      this.getFilteredTrips();
    });

    this.orderService.getOrders(this.userId).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  getOrderCount(tripId: string): number {
    if(this.orders === undefined) return 0;
    return this.orders
        .filter((order: Order) => order.tripId === tripId)
        .reduce((total: number, order: Order) => total + order.count, 0);
  }

  getTripStatus(startDate: Date, endDate: Date): string {
    const today = new Date();
    if(new Date(startDate) > today) return "Upcoming";
    if(new Date(endDate) < today) return "Archive";
    return "Ongoing";
  }

  filterArchiveChange(): void {
    this.filterArchive = !this.filterArchive;
    this.getFilteredTrips();
  }

  filterOngoingChange(): void {
    this.filterOngoing = !this.filterOngoing;
    this.getFilteredTrips();
  }

  filterUpcomingChange(): void {
    this.filterUpcoming = !this.filterUpcoming;
    this.getFilteredTrips();
  }

  getFilteredTrips() {
    this.filteredTrips = this.trips.filter((trip) => {
      const status = this.getTripStatus(trip.startDate, trip.endDate);
      return (
        (this.filterArchive && status === 'Archive') ||
        (this.filterOngoing && status === 'Ongoing') ||
        (this.filterUpcoming && status === 'Upcoming')
      );
    });
  }
}
