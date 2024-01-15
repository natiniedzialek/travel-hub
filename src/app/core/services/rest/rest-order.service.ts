import {Injectable} from '@angular/core';
import {Order} from "../../models/order";
import {Reservation} from "../../models/reservation";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RestTripService} from "./rest-trip.service";
import {RestReservationService} from "./rest-reservation.service";
import {OrderService} from "../interface/order.service";

@Injectable({
    providedIn: 'root'
})
export class RestOrderService implements OrderService {
    private apiUrl = 'http://localhost:3000/api/orders/';
    private userId: string = "65a47a7b26d03db5c32b3dcb";

    constructor(private http: HttpClient,
                private tripService: RestTripService,
                private reservationService: RestReservationService
    ) {
    }

    placeOrder(reservations: Reservation[]): void {
        reservations.forEach((reservation: Reservation) => {
            const order: Order = new Order(reservation.userId, reservation.tripId, reservation.count, new Date());
            this.http.post(this.apiUrl, JSON.parse(JSON.stringify(order))).subscribe();
            this.tripService.updatePlacesLeft(reservation.tripId, reservation.count);
            this.reservationService.deleteReservation(reservation._id);
        });
    }

    getOrders(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl + 'user/' + userId);
    }
}
