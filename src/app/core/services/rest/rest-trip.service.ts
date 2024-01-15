import {Injectable} from '@angular/core';
import {Trip} from "../../models/trip";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TripService} from "../interface/trip.service";

@Injectable({
    providedIn: 'root'
})
export class RestTripService implements TripService {
    private apiUrl = 'http://localhost:3000/api/trips/';

    constructor(private http: HttpClient) { }

    addTrip(trip: Trip) {
        console.log(JSON.parse(JSON.stringify(trip)))
        this.http.post(this.apiUrl, JSON.parse(JSON.stringify(trip))).subscribe();
    }

    updatePlacesLeft(tripId: string, placesSold: number): void {
        this.getTrip(tripId).subscribe(trip => {
            trip.placesLeft -= placesSold;
            this.http.put(this.apiUrl + tripId, JSON.parse(JSON.stringify(trip))).subscribe();
        });
    }

    getTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.apiUrl);
    }

    getTrip(tripId: string): Observable<Trip> {
        return this.http.get<Trip>(this.apiUrl + tripId);
    }

    deleteTrip(tripId: string) {
        this.http.delete(this.apiUrl + tripId).subscribe();
    }
}
