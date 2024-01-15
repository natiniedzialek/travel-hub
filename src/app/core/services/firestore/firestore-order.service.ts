import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../models/order';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {FirestoreTripService} from "./firestore-trip.service";
import {FirestoreReservationService} from "./firestore-reservation.service";
import {Reservation} from "../../models/reservation";
import {OrderService} from "../interface/order.service";

@Injectable({
  providedIn: 'root'
})
export class FirestoreOrderService implements OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private userId: string = "65a47a7b26d03db5c32b3dcb";

  constructor(private firestore: AngularFirestore, private tripService: FirestoreTripService, private reservationService: FirestoreReservationService) {
    this.ordersCollection = this.firestore.collection<Order>('orders');
  }

  placeOrder(reservations: Reservation[]): void {
    reservations.forEach((reservation: Reservation) => {
      const order: Order = new Order(reservation.userId, reservation.tripId, reservation.count, new Date(), this.firestore.createId());
      const orderData = JSON.parse(JSON.stringify(order));
      this.ordersCollection.add(orderData);
      this.tripService.updatePlacesLeft(reservation.tripId, reservation.count);
      this.reservationService.deleteReservation(reservation._id);
    });
  }

  getOrders(userId: string): Observable<Order[]> {
    const query = this.ordersCollection.ref.where('userId', '==', userId);
    return this.firestore.collection<Order>('orders', (ref) => query).valueChanges();
  }
}
