import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsUrl = 'assets/trips.json';
  private placesLeft: { [key: string]: number } = {};
  private reservations: { [key: string]: number } = {};

  constructor(private http: HttpClient) {
    this.getTrips().subscribe({next: (data) => {
      for (const trip of data) {
        this.placesLeft[trip.name] = trip.maxParticipants;
      }
    }});
  }

  getTrips(): Observable<Trip[]> {
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
}