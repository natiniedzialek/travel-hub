import {Component} from '@angular/core';
import {FirestoreTripService} from "../core/services/firestore/firestore-trip.service";
import {ActivatedRoute} from '@angular/router';
import {Trip} from "../core/models/trip";
import {CurrencyService} from "../core/services/currency.service";
import {FirestoreReservationService} from "../core/services/firestore/firestore-reservation.service";
import {Reservation} from "../core/models/reservation";
import {Database, DatabaseInfoService} from "../core/services/database-info.service";
import {RestTripService} from "../core/services/rest/rest-trip.service";
import {RestReservationService} from "../core/services/rest/rest-reservation.service";
import {TripService} from "../core/services/interface/trip.service";
import {ReservationService} from "../core/services/interface/reservation.service";

@Component({
    selector: 'app-trip', templateUrl: './trip.component.html', styleUrl: './trip.component.css'
})
export class TripComponent {
    tripId: string;
    trip: Trip;
    currencyCode: string = this.currencyService.getCurrency();
    carouselImages: string[];
    reservationsCount: { [key: string]: number } = {};

    tripService: TripService;
    reservationService: ReservationService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private route: ActivatedRoute,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService,
        private currencyService: CurrencyService,
        private firestoreReservationService: FirestoreReservationService,
        private restReservationService: RestReservationService
    ) { }

    ngOnInit(): void {
        this.databaseInfoService.database$.subscribe((currentDatabase: Database) => {
            switch (currentDatabase) {
                case Database.Firestore:
                    this.tripService = this.firestoreTripService;
                    this.reservationService = this.firestoreReservationService;
                    break;
                case Database.Mongo:
                    this.tripService = this.restTripService;
                    this.reservationService = this.restReservationService;
                    break;
            }
        });

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
