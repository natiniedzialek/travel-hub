import { Component } from '@angular/core';
import { FilterModalComponent } from '../../../filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyService } from '../../../core/services/currency.service';
import { TripService } from '../../../core/services/trip.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  constructor(
    private dialog: MatDialog,
    private currencyService: CurrencyService,
    private tripService: TripService
  ) {}

  openFilterModal(): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  setCurrency(currency: string): void {
    this.currencyService.setCurrency(currency);
  }
}
