import {Reservation} from "../../models/reservation";
import {Order} from "../../models/order";
import {Observable} from "rxjs";

export interface OrderService {
    placeOrder(reservations: Reservation[]): void;
    getOrders(userId: string): Observable<Order[]>;
}
