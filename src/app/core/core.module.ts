import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TripFilterPipe } from './pipes/trip-filter.pipe';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';


// add services like data fetching, authentication etc - singletons
@NgModule({
  declarations: [
    CurrencyFormatPipe,
    TripFilterPipe
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  exports: [
    CurrencyFormatPipe,
    TripFilterPipe
  ]
})
export class CoreModule { }
