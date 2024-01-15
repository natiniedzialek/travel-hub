import {Component} from '@angular/core';
import {FirestoreTripService} from "../core/services/firestore/firestore-trip.service";
import {FirestoreOrderService} from "../core/services/firestore/firestore-order.service";
import {CurrencyService} from "../core/services/currency.service";
import {Trip} from "../core/models/trip";
import {Order} from "../core/models/order";
import {Database, DatabaseInfoService} from "../core/services/database-info.service";
import {RestTripService} from "../core/services/rest/rest-trip.service";
import {RestOrderService} from "../core/services/rest/rest-order.service";
import {TripService} from "../core/services/interface/trip.service";
import {OrderService} from "../core/services/interface/order.service";

@Component({
    selector: 'app-history', templateUrl: './history.component.html', styleUrl: './history.component.css'
})
export class HistoryComponent {
    currencyCode: string;
    trips: Trip[];
    userId: string = "65a47a7b26d03db5c32b3dcb";
    orders: Order[];
    filteredTrips: Trip[];

    filterArchive: boolean = true;
    filterOngoing: boolean = true;
    filterUpcoming: boolean = true;

    tripService: TripService;
    orderService: OrderService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService,
        private firestoreOrderService: FirestoreOrderService,
        private restOrderService: RestOrderService,
        private currencyService: CurrencyService
    ) { }

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
        if (this.orders === undefined) return 0;
        return this.orders
            .filter((order: Order) => order.tripId === tripId)
            .reduce((total: number, order: Order) => total + order.count, 0);
    }

    getTripStatus(startDate: Date, endDate: Date): string {
        const today = new Date();
        if (new Date(startDate) > today) return "Upcoming";
        if (new Date(endDate) < today) return "Archive";
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
            return ((this.filterArchive && status === 'Archive') || (this.filterOngoing && status === 'Ongoing') || (this.filterUpcoming && status === 'Upcoming'));
        });
    }
}
