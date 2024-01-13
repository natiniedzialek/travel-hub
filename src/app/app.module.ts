import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CoreModule } from './core/core.module';
import { AddTripModalComponent } from './add-trip-modal/add-trip-modal.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TripComponent } from './trip/trip.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogContent } from "@angular/material/dialog";
import { ReviewComponent } from './review/review.component';
import {MatSliderModule} from "@angular/material/slider";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterModalComponent,
    CartComponent,
    AddTripModalComponent,
    HistoryComponent,
    AboutComponent,
    TripComponent,
    ReviewComponent
  ],
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatSelectModule,
        RouterModule,
        CarouselModule,
        NgxPaginationModule,
        MatChipsModule,
        MatIconModule,
        MatDialogContent,
        MatSliderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
