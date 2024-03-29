import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FirestoreTripService} from '../core/services/firestore/firestore-trip.service';
import {map} from 'rxjs/operators';
import {FilterService} from '../core/services/filter.service';
import {Filter} from '../core/models/filter';
import {CurrencyService} from '../core/services/currency.service';
import {Database, DatabaseInfoService} from "../core/services/database-info.service";
import {RestTripService} from "../core/services/rest/rest-trip.service";
import {TripService} from "../core/services/interface/trip.service";

@Component({
    selector: 'app-filter-modal', templateUrl: './filter-modal.component.html', styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
    filterDestination?: string[];
    filterMinRating?: number;
    filterMinPrice?: number;
    filterMaxPrice?: number;
    filterStartDate?: Date;
    filterEndDate?: Date;

    destinations: any;
    availablePrices: any;
    availableStars = [1, 2, 3, 4, 5];
    minDate: Date = new Date();

    currencyCode: string = this.currencyService.getCurrency();

    tripService: TripService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private dialogRef: MatDialogRef<FilterModalComponent>,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService,
        private filterService: FilterService,
        private currencyService: CurrencyService
    ) { }

    ngOnInit() {
        this.databaseInfoService.database$.subscribe((currentDatabase: Database) => {
            switch (currentDatabase) {
                case Database.Firestore:
                    this.tripService = this.firestoreTripService;
                    break;
                case Database.Mongo:
                    this.tripService = this.restTripService;
                    break;
            }
        });

        let trips = this.tripService.getTrips();

        this.currencyService.currencyChange$.subscribe(newCurrency => {
            this.currencyCode = newCurrency
        });

        trips.pipe(map(trips => trips.map(trip => trip.destination)))
            .subscribe((data: any) => this.destinations = Array.from(new Set(data)).sort());

        trips.pipe(map(trips => trips.map(trip => trip.unitPrice)))
            .subscribe((data: any) => this.availablePrices = Array.from(new Set(data)).sort());
    }

    close(): void {
        this.dialogRef.close();
    }

    applyFilters(): void {
        this.filterService.applyFilters(new Filter(this.filterDestination, this.filterMinPrice, this.filterMaxPrice, this.filterStartDate, this.filterEndDate));
        this.close();
    }
}
