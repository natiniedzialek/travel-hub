import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from '../../../core/services/currency.service';
import {ReservationService} from '../../../core/services/reservation.service';
import {Reservation} from '../../../core/models/reservation';
import {TripService} from "../../../core/services/trip.service";
import {Trip} from "../../../core/models/trip";
import {Observable, zip} from "rxjs";

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
        private tripService: TripService,
        private reservationService: ReservationService,
        private router: Router,
        private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
        this.currencyService.currencyChange$.subscribe(newCurrency => {
            this.currencyCode = newCurrency
        });
        this.getCartCount();
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

    private getCartCount(): void {
        this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
            this.cartCount = reservations.reduce((acc, reservation) => acc + reservation.count, 0);
        });
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
