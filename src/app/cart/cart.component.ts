import {Component} from '@angular/core';
import {FirestoreReservationService} from "../core/services/firestore/firestore-reservation.service";
import {Reservation} from "../core/models/reservation";
import {FirestoreOrderService} from "../core/services/firestore/firestore-order.service";
import {FirestoreTripService} from "../core/services/firestore/firestore-trip.service";
import {CurrencyService} from "../core/services/currency.service";
import {Trip} from "../core/models/trip";
import {Observable} from "rxjs";
import {Database, DatabaseInfoService} from "../core/services/database-info.service";
import {RestTripService} from "../core/services/rest/rest-trip.service";
import {RestReservationService} from "../core/services/rest/rest-reservation.service";
import {RestOrderService} from "../core/services/rest/rest-order.service";
import {TripService} from "../core/services/interface/trip.service";
import {ReservationService} from "../core/services/interface/reservation.service";
import {OrderService} from "../core/services/interface/order.service";

@Component({
    selector: 'app-cart', templateUrl: './cart.component.html', styleUrl: './cart.component.css'
})
export class CartComponent {
    reservations$: Observable<Reservation[]>;
    reservations: Reservation[];
    currencyCode: string = this.currencyService.getCurrency();
    trips$: Observable<Trip[]>;
    trips: Trip[];
    total: number;
    userId: string = "65a47a7b26d03db5c32b3dcb";

    private tripService: TripService;
    private reservationService: ReservationService;
    private orderService: OrderService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService,
        private firestoreReservationService: FirestoreReservationService,
        private restReservationService: RestReservationService,
        private firestoreOrderService: FirestoreOrderService,
        private restOrderService: RestOrderService,
        private currencyService: CurrencyService
    ) { }

    ngOnInit(): void {
        this.databaseInfoService.database$.subscribe((currentDatabase: Database) => {
            switch (currentDatabase) {
                case Database.Firestore:
                    this.tripService = this.firestoreTripService;
                    this.reservationService = this.firestoreReservationService;
                    this.orderService = this.firestoreOrderService;
                    break;
                case Database.Mongo:
                    this.tripService = this.restTripService;
                    this.reservationService = this.restReservationService;
                    this.orderService = this.restOrderService;
                    break;
            }
        });

        this.currencyService.currencyChange$.subscribe(newCurrency => {
            this.currencyCode = newCurrency
        });

        this.trips$ = this.tripService.getTrips();
        this.trips$.subscribe((trips: Trip[]) => {
            this.trips = trips;
        });

        this.reservations$ = this.reservationService.getReservations()
        this.reservations$.subscribe((reservations: Reservation[]) => {
            this.reservations = reservations;
            this.total = this.getTotal();
        });
    }

    private getTotal(): number {
        if (this.reservations === undefined || this.trips === undefined) return 0;
        return this.reservations
            .filter((reservation: Reservation) => reservation.selected)
            .reduce((total: number, reservation: Reservation) => {
                const trip = this.trips.find((trip: Trip) => trip._id === reservation.tripId);
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
        this.orderService.placeOrder(this.reservations.filter((reservation: Reservation) => reservation.selected));
        this.getTotal();
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
        if (reservation.selected) {
            this.reservationService.unselectReservation(tripId);
        } else {
            this.reservationService.selectReservation(tripId);
        }
    }
}
