import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsUrl = 'assets/trips.json';
  private placesLeft: { [key: string]: number } = {};
  private reservations: { [key: string]: number } = {};
  private trips: any;

  constructor(private http: HttpClient) {
    this.fetchTrips().subscribe({next: (data) => {
      for (const trip of data) {
        this.placesLeft[trip.name] = trip.maxParticipants;
      }
    }});
    this.trips = this.fetchTrips();
  }

  getTrips(): any {
    return this.trips;
  }

  private fetchTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getPlacesLeft(): { [key: string]: number } {
    return this.placesLeft;
  }

  getReservations(tripName: string): number {
    if(tripName in this.reservations) {
      return this.reservations[tripName];
    }
    return 0;
  }

  addReservation(tripName: string): void {
    if(!(tripName in this.reservations)) {
      this.reservations[tripName] = 0;
    }
    this.reservations[tripName]++;
  }

  removeReservation(tripName: string): void {
    this.reservations[tripName]--;
    if(this.reservations[tripName] == 0) {
      delete this.reservations[tripName];
    }
  }

  getReservationValue(): number {
    return Object.values(this.reservations).reduce((acc, currentValue) => acc + currentValue, 0);
  }

  removeTrip(tripName: string): void {
    console.log("trip deleted");
  }
}