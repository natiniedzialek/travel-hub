import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from '../../../core/services/currency.service';
import {FirestoreReservationService} from '../../../core/services/firestore/firestore-reservation.service';
import {Reservation} from '../../../core/models/reservation';
import {FirestoreTripService} from "../../../core/services/firestore/firestore-trip.service";
import {Trip} from "../../../core/models/trip";
import {Observable} from "rxjs";

@Component({
    selector: 'app-footer', templateUrl: './footer.component.html', styleUrl: './footer.component.css'
})
export class FooterComponent {
    reservations$ = this.reservationService.getReservations();
    reservations: Reservation[];
    trips$: Observable<Trip[]> = this.tripService.getTrips();
    trips: Trip[];
    cartCount: number;
    private userId: number = 1;
    currencyCode: string = this.currencyService.getCurrency();
    total: number;

    constructor(
        private tripService: FirestoreTripService,
        private reservationService: FirestoreReservationService,
        private router: Router,
        private currencyService: CurrencyService) {
    }

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
                const trip = this.trips.find((trip: Trip) => trip.id === reservation.tripId);
                return total + trip.unitPrice * reservation.count;
            }, 0);
    }

    handleBasketClick(): void {
        this.router.navigate(['/cart', this.userId]);
    }
}
