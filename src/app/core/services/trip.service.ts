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

  getTrips(): Observable<Trip[]> {
    return this.tripsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Trip;
          return data;
        })
      )
    );
  }

  deleteTrip(tripId: string) {
    this.tripsCollection.ref.where('id', '==', tripId).get().then(querySnapshot => {
      return this.tripsCollection.doc(querySnapshot.docs[0].id).delete();
    });
  }
}