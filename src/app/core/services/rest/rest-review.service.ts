import {Injectable} from '@angular/core';
import {Review} from "../../models/review";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReviewService} from "../interface/review.service";

@Injectable({
    providedIn: 'root'
})
export class RestReviewService implements ReviewService {
    private apiUrl = 'http://localhost:3000/api/reviews/';

    constructor(private http: HttpClient) {  }

    addReview(review: Review): void {
        this.http.post(this.apiUrl, JSON.parse(JSON.stringify(review))).subscribe();
    }

    getReviews(tripId: string): Observable<Review[]> {
        return this.http.get<Review[]>(this.apiUrl + 'trip/' + tripId);
    }
}
