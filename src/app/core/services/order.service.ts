import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {TripService} from "./trip.service";
import {ReservationService} from "./reservation.service";
import {Reservation} from "../models/reservation";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private userId: string = "1";

  constructor(private firestore: AngularFirestore, private tripService: TripService, private reservationService: ReservationService) {
    this.ordersCollection = this.firestore.collection<Order>('orders');
  }

  placeOrder(reservations: Reservation[]): void {
    reservations.forEach((reservation: Reservation) => {
      const order: Order = new Order(this.firestore.createId(), reservation.userId, reservation.tripId, reservation.count, new Date());
      const orderData = JSON.parse(JSON.stringify(order));
      this.ordersCollection.add(orderData);
      this.tripService.updatePlacesLeft(reservation.tripId, reservation.count);
      this.reservationService.deleteReservation(reservation.id);
    });
  }

  getOrders(userId: string): Observable<Order[]> {
    const query = this.ordersCollection.ref.where('userId', '==', userId);
    return this.firestore.collection<Order>('orders', (ref) => query).valueChanges();
  }
}
