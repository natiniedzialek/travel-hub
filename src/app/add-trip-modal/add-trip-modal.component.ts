import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TripService } from '../core/services/trip.service';
import { Trip } from '../core/models/trip';

@Component({
  selector: 'app-add-trip-modal',
  templateUrl: './add-trip-modal.component.html',
  styleUrls: ['./add-trip-modal.component.css']
})
export class AddTripModalComponent {
  name!: string;
  destination!: string;
  startDate!: Date;
  endDate!: Date;
  unitPrice!: number;
  placesLeft!: number;
  description!: string;
  image!: string;

  minDate: Date;

  constructor(
    private dialogRef: MatDialogRef<AddTripModalComponent>,
    private tripService: TripService
  ) {
    let tomorrow = new Date();
    this.minDate = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
  }

  close(): void {
    this.dialogRef.close();
  }

  saveTrip(): void {
    console.log("wtf")
    this.tripService.addTrip(new Trip(this.name, this.destination, this.startDate, this.endDate, this.unitPrice, this.placesLeft, this.description, this.image))
      .then(() => {
        console.log('Trip added successfully');
      });;
    this.close();
  }
}