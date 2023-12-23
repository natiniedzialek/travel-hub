import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';


// add services like data fetching, authentication etc - singletons
@NgModule({
  declarations: [
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
