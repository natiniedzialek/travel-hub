import { Component } from '@angular/core';
import { FilterModalComponent } from '../../../filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  constructor(private dialog: MatDialog) {}

  openFilterModal(): void {
    const dialogRef = this.dialog.open(FilterModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
