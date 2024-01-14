import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';
import { Filter } from '../models/filter';
import { Review } from "../models/review";
import { lastValueFrom } from "rxjs";
import {FirestoreReviewService} from "../services/firestore/firestore-review.service";

@Pipe({
  name: 'tripFilter',
})
export class TripFilterPipe implements PipeTransform {
  constructor(private reviewService: FirestoreReviewService) { }

  transform(trips: Trip[], filters: Filter): Trip[] {
    if (!trips || !filters) {
      return trips;
    }

    return trips.filter(trip =>
      this.filterByRating(trip, filters.minRating) &&
      this.filterByDestination(trip, filters.destination) &&
      this.filterByPrice(trip, filters.minPrice, filters.maxPrice) &&
      this.filterByDate(trip, filters.startDate, filters.endDate)
    );
  }

  // TODO: Fix this
  private countMean(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating;
    }

    return sum / reviews.length;
  }

  private async filterByRating(trip: Trip, minRating: number): Promise<boolean> {
    try {
      const reviews = await lastValueFrom(this.reviewService.getReviews(trip.id));
      if (reviews.length === 0) {
        return false;
      }

      const mean = this.countMean(reviews);

      return mean >= minRating;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  private filterByDestination(trip: Trip, destinations: string[]): boolean {
    if (destinations.length === 0) {
      return true;
    }
    return destinations.includes(trip.destination);
  }

  private filterByPrice(trip: Trip, minPrice: number, maxPrice: number): boolean {
    return (trip.unitPrice >= minPrice) &&
           (trip.unitPrice <= maxPrice!);
  }

  private filterByDate(trip: Trip, startDate: Date, endDate: Date): boolean {
    return (new Date(trip.startDate) >= startDate) &&
           (new Date(trip.endDate) <= endDate);
  }
}
