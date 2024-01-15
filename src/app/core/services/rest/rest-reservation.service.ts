import { Injectable } from '@angular/core';
import { Reservation } from "../../models/reservation";
import { Observable } from "rxjs";
import { ReservationService } from "../interface/reservation.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RestReservationService implements ReservationService {
    private apiUrl = 'http://localhost:3000/api/reservations/';
    private userId: string = "65a47a7b26d03db5c32b3dcb";

    constructor(private http: HttpClient) { }

    getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiUrl);
    }

    getReservationsForTrip(tripId: string): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.apiUrl + 'trip/' + tripId);
    }

    deleteReservation(id: string) {
        this.http.delete(this.apiUrl + '/' + id).subscribe();
    }

    deleteOneReservation(tripId: string) {
        this.getReservationsForTrip(tripId).subscribe(reservations => {
            const reservation = reservations[0];
            if (reservation.count > 1) {
                reservation.count--;
                this.http.put(this.apiUrl + '/' + reservation._id, JSON.parse(JSON.stringify(reservation))).subscribe();
            } else {
                this.http.delete(this.apiUrl + '/' + reservation._id).subscribe();
            }
        });
    }

    addOneReservation(tripId: string){
        this.getReservationsForTrip(tripId).subscribe(reservations => {
            if (reservations.length > 0) {
                const reservation = reservations[0];
                reservation.count++;
                this.http.put(this.apiUrl + '/' + reservation._id, JSON.parse(JSON.stringify(reservation))).subscribe();
            } else {
                const newReservation = new Reservation(this.userId, tripId, 1, true);
                this.http.post(this.apiUrl, JSON.parse(JSON.stringify(newReservation))).subscribe();
            }
        });
    }

    selectReservation(tripId: string) {
        this.getReservationsForTrip(tripId).subscribe(reservations => {
            const reservation = reservations[0];
            reservation.selected = true;
            this.http.put(this.apiUrl + '/' + reservation._id, JSON.parse(JSON.stringify(reservation))).subscribe();
        });
    }

    unselectReservation(tripId: string) {
        this.getReservationsForTrip(tripId).subscribe(reservations => {
            const reservation = reservations[0];
            reservation.selected = false;
            this.http.put(this.apiUrl + '/' + reservation._id, JSON.parse(JSON.stringify(reservation))).subscribe();
        });
    }
}
