import {Trip} from "../../models/trip";
import {Observable} from "rxjs";

export interface TripService {
    addTrip(trip: Trip): void;
    updatePlacesLeft(tripId: string, placesSold: number): void;
    getTrips(): Observable<Trip[]>;
    getTrip(tripId: string): Observable<Trip>;
    deleteTrip(tripId: string): void;
}
