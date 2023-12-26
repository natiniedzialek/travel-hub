import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';
import { Filter } from '../models/filter';

@Pipe({
  name: 'tripFilter',
})
export class TripFilterPipe implements PipeTransform {
  transform(trips: Trip[], filters: Filter): Trip[] {
    if (!trips || !filters) {
      return trips;
    }

    return trips.filter(trip =>
      this.filterByDestination(trip, filters.destination) &&
      this.filterByPrice(trip, filters.minPrice, filters.maxPrice) &&
      this.filterByDate(trip, filters.startDate, filters.endDate)
    );
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
