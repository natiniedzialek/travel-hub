import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {

  constructor(private dialogRef: MatDialogRef<FilterModalComponent>) {}

    close(): void {
      this.applyFilters();
      this.dialogRef.close();
    }
    applyFilters(): void {
      console.log('filter applied')
    }
}
