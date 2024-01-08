import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Reservation} from '../models/reservation';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationsCollection: AngularFirestoreCollection<Reservation>;

  constructor(private firestore: AngularFirestore) {
    this.reservationsCollection = this.firestore.collection<Reservation>('reservations');
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservationsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          return a.payload.doc.data() as Reservation;
        })
      )
    );
  }

  deleteOneReservation(tripId: string) {
    this.reservationsCollection.ref.where('tripId', '==', tripId).get().then(querySnapshot => {
        const reservationData = querySnapshot.docs[0].data();
        const updatedCount = reservationData.count - 1;
        if (updatedCount > 0) {
          return this.reservationsCollection.doc(querySnapshot.docs[0].id).update({
            count: updatedCount,
          });
        } else {
          return this.reservationsCollection.doc(querySnapshot.docs[0].id).delete();
        }
      });
  }

  addOneReservation(tripId: string) {
    this.reservationsCollection.ref.where('tripId', '==', tripId).get().then(querySnapshot => {
      if (!querySnapshot.empty) {
        const reservationData = querySnapshot.docs[0].data();
        const updatedCount = reservationData.count + 1;
        this.reservationsCollection.doc(querySnapshot.docs[0].id).update({ count: updatedCount });
      } else {
        const newReservation = {
          id: this.firestore.createId(),
          tripId: tripId,
          userId: '1',
          count: 1,
          selected: true
        };
        this.reservationsCollection.add(newReservation);
      }
    });
  }

  selectReservation(tripId: string) {
    this.reservationsCollection.ref.where('tripId', '==', tripId).get().then(querySnapshot => {
      this.reservationsCollection.doc(querySnapshot.docs[0].id).update({ selected: true });
    });
  }

  unselectReservation(tripId: string) {
    this.reservationsCollection.ref.where('tripId', '==', tripId).get().then(querySnapshot => {
      this.reservationsCollection.doc(querySnapshot.docs[0].id).update({ selected: false });
    });
  }
}
