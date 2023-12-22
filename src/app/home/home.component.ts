import { Component, OnInit } from '@angular/core';
import { TripService } from '../core/services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trips: any[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips = data.trips;
    });
  }
}