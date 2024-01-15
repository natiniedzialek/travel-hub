import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from '../../../core/services/currency.service';
import {FirestoreReservationService} from '../../../core/services/firestore/firestore-reservation.service';
import {Reservation} from '../../../core/models/reservation';
import {FirestoreTripService} from "../../../core/services/firestore/firestore-trip.service";
import {Trip} from "../../../core/models/trip";
import {Observable} from "rxjs";
import {Database, DatabaseInfoService} from "../../../core/services/database-info.service";
import {RestTripService} from "../../../core/services/rest/rest-trip.service";
import {RestReservationService} from "../../../core/services/rest/rest-reservation.service";
import {TripService} from "../../../core/services/interface/trip.service";
import {ReservationService} from "../../../core/services/interface/reservation.service";

@Component({
    selector: 'app-footer', templateUrl: './footer.component.html', styleUrl: './footer.component.css'
})
export class FooterComponent {
    reservations$: Observable<Reservation[]>;
    reservations: Reservation[];
    trips$: Observable<Trip[]>;
    trips: Trip[];
    cartCount: number;
    private userId: string = "65a47a7b26d03db5c32b3dcb";
    currencyCode: string = this.currencyService.getCurrency();
    total: number;

    tripService: TripService;
    reservationService: ReservationService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService,
        private firestoreReservationService: FirestoreReservationService,
        private restReservationService: RestReservationService,
        private router: Router,
        private currencyService: CurrencyService) {
    }

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

        this.currencyService.currencyChange$.subscribe(newCurrency => {
            this.currencyCode = newCurrency
        });

        this.trips$ = this.tripService.getTrips();
        this.trips$.subscribe((trips: Trip[]) => {
            this.trips = trips;
        });

        this.reservations$ = this.reservationService.getReservations();
        this.reservations$.subscribe((reservations: Reservation[]) => {
          this.reservations = reservations;
          this.total = this.getTotal();
          this.cartCount = this.getCartCount();
        });
    }

    private getCartCount(): number {
        if(this.reservations) {
            return this.reservations
                .reduce((total: number, reservation: Reservation) => {
                    return total + reservation.count;
                }, 0);
        }
        return 0;
    }

    private getTotal(): number {
        if(this.reservations === undefined || this.trips === undefined) return 0;
        return this.reservations
            .reduce((total: number, reservation: Reservation) => {
                const trip = this.trips.find((trip: Trip) => trip._id === reservation.tripId);
                return total + trip.unitPrice * reservation.count;
            }, 0);
    }

    handleBasketClick(): void {
        this.router.navigate(['/cart', this.userId]);
    }
}
