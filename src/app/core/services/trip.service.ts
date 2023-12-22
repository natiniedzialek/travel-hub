import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsUrl = 'assets/trips.json';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<any> {
    return this.http.get(this.tripsUrl);
  }
}
