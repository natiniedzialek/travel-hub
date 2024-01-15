import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FirestoreTripService} from '../core/services/firestore/firestore-trip.service';
import {Trip} from '../core/models/trip';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {RestTripService} from "../core/services/rest/rest-trip.service";
import {TripService} from "../core/services/interface/trip.service";
import {Database, DatabaseInfoService} from "../core/services/database-info.service";

@Component({
    selector: 'app-add-trip-modal', templateUrl: './add-trip-modal.component.html', styleUrls: ['./add-trip-modal.component.css']
})
export class AddTripModalComponent {
    name!: string;
    destination!: string;
    startDate!: Date;
    endDate!: Date;
    unitPrice!: number;
    placesLeft!: number;
    description!: string;
    images: string[] = [];
    mapSrc!: string;
    minDate: Date;
    separatorKeysCodes = [ENTER, COMMA] as const;

    private tripService: TripService;

    constructor(
        private databaseInfoService: DatabaseInfoService,
        private dialogRef: MatDialogRef<AddTripModalComponent>,
        private firestoreTripService: FirestoreTripService,
        private restTripService: RestTripService
    ) { }

    ngOnInit(): void {
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

        let tomorrow = new Date();
        this.minDate = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    }

    close(): void {
        this.dialogRef.close();
    }

    saveTrip(): void {
        this.tripService.addTrip(new Trip(this.name, this.destination, this.startDate, this.endDate, this.unitPrice, this.placesLeft, this.description, this.images, this.mapSrc));
        this.close();
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.images.push(value);
        }
        event.chipInput!.clear();
    }

    remove(image: string): void {
        const index = this.images.indexOf(image);

        if (index >= 0) {
            this.images.splice(index, 1);
        }
    }
}
