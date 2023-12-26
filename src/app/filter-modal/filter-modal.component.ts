import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TripService } from '../core/services/trip.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterService } from '../core/services/filter.service';
import { Filter } from '../core/models/filter';
import { CurrencyService } from '../core/services/currency.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  filterDestination?: string[];
  filterMinPrice?: number;
  filterMaxPrice?: number;
  filterStartDate?: Date;
  filterEndDate?: Date;

  destinations: any;
  availablePrices: any;
  minDate: Date = new Date();

  currencyCode: string = this.currencyService.getCurrency();

  constructor(private dialogRef: MatDialogRef<FilterModalComponent>,
    private tripService: TripService,
    private filterService: FilterService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    let trips = this.tripService.getTrips();

    this.currencyService.currencyChange$.subscribe(newCurrency => {
      this.currencyCode = newCurrency
    });

    // TODO: DO NOT REPEAT VALUES in data
    trips.pipe(map(trips => trips.map(trip => trip.destination)))
      .subscribe((data: any) => this.destinations = Array.from(new Set(data)).sort());

    trips.pipe(map(trips => trips.map(trip => trip.unitPrice)))
      .subscribe((data: any) => this.availablePrices = Array.from(new Set(data)).sort());
  }

  close(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {
    this.filterService.applyFilters(new Filter(
      this.filterDestination,
      this.filterMinPrice,
      this.filterMaxPrice,
      this.filterStartDate,
      this.filterEndDate
    ));
    this.close();
  }
}
