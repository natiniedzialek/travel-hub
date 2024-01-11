import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsCollection: AngularFirestoreCollection<Trip>;

  constructor(private firestore: AngularFirestore) {
    this.tripsCollection = this.firestore.collection<Trip>('trips');
  }

  async addTrip(trip: Trip): Promise<any> {
    trip.id = this.firestore.createId();
    const tripData = JSON.parse(JSON.stringify(trip));
    return this.tripsCollection.add(tripData)
    .catch(error => {
      console.error('Error adding trip: ', error);
    });
  }

  updatePlacesLeft(tripId: string, placesSold: number): void {
    this.tripsCollection.ref.where('id', '==', tripId).get().then(querySnapshot => {
      const trip = querySnapshot.docs[0].data() as Trip;
      return this.tripsCollection.doc(querySnapshot.docs[0].id).update({
        placesLeft: trip.placesLeft - placesSold
      });
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.tripsCollection.valueChanges();
  }

  getTrip(tripId: string): Observable<Trip> {
    const query = this.tripsCollection.ref.where('id', '==', tripId);
    return this.firestore.collection<Trip>('trips', (ref) => query).valueChanges().pipe(
      map((trips: Trip[]) => trips[0])
    );
  }

  deleteTrip(tripId: string) {
    this.tripsCollection.ref.where('id', '==', tripId).get().then(querySnapshot => {
      return this.tripsCollection.doc(querySnapshot.docs[0].id).delete();
    });
  }
}
