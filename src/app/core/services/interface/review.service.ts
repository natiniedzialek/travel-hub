import {Review} from "../../models/review";
import {Observable} from "rxjs";

export interface ReviewService {
    addReview(review: any): void;
    getReviews(tripId: string): Observable<Review[]>;
}
