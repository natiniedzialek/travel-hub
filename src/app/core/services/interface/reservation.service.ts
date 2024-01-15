import {Observable} from "rxjs";
import {Reservation} from "../../models/reservation";

export interface ReservationService {
    getReservations(): Observable<Reservation[]>;
    deleteReservation(id: string): void;
    deleteOneReservation(tripId: string): void;
    addOneReservation(tripId: string): void;
    selectReservation(tripId: string): void;
    unselectReservation(tripId: string): void;
}
