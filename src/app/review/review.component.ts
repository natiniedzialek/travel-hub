import {Component, Input, ViewChild} from '@angular/core';
import {ReviewService} from "../core/services/review.service";
import {Review} from "../core/models/review";
import {NgForm} from "@angular/forms";
import {get} from "@angular/fire/database";

@Component({
  selector: 'app-review', templateUrl: './review.component.html', styleUrl: './review.component.css'
})
export class ReviewComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  // adding review
  nick: string;
  title: string;
  content: string;
  rating: number = 5;
  purchaseDate: Date;

  @ViewChild('reviewForm') reviewForm: NgForm;
  @Input() tripId: string;

  reviews: Review[];

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.reviewService.getReviews(this.tripId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  rate(star: number) {
    this.rating = star;
  }

  addReview() {
    const review = new Review(this.nick, this.tripId, this.title, this.content, this.rating, this.purchaseDate);

    // reset the form
    this.nick = '';
    this.title = '';
    this.content = '';
    this.rating = 5;
    this.purchaseDate = null;

    // add review to db
    this.reviewService.addReview(review).then(() => {
      console.log('Review added successfully');
    });
  }

  countReviews(): number {
    return this.reviews.length;
  }

  countRating(): number {
    let sum = 0;
    this.reviews.forEach(review => {
      sum += review.rating;
    });
    return sum / this.countReviews();
  }

  get starsForRating() {
    return Array(Math.floor(this.countRating())).fill(0);
  }
}
