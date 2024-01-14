import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Review} from "../../models/review";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirestoreReviewService {
  private reviewCollection: AngularFirestoreCollection<Review>;

  constructor(private firestore: AngularFirestore) {
    this.reviewCollection = this.firestore.collection<Review>('reviews');
  }

  async addReview(review: Review): Promise<any> {
    review.id = this.firestore.createId();
    const reviewData = JSON.parse(JSON.stringify(review));
    return this.reviewCollection.add(reviewData)
      .catch(error => {
        console.error('Error adding review: ', error);
      });
  }

  getReviews(tripId: string): Observable<Review[]> {
    const query = this.reviewCollection.ref.where('tripId', '==', tripId);
    return this.firestore.collection<Review>('reviews', (ref) => query).valueChanges();
  }
}
