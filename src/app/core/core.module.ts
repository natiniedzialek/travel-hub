import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TripFilterPipe } from './pipes/trip-filter.pipe';


// add services like data fetching, authentication etc - singletons
@NgModule({
  declarations: [
    CurrencyFormatPipe,
    TripFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyFormatPipe,
    TripFilterPipe
  ]
})
export class CoreModule { }
