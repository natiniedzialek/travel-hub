import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from "./history/history.component";
import { AboutComponent } from "./about/about.component";
import { TripComponent } from "./trip/trip.component";

const routes: Routes = [
  { path: 'trips', component: HomeComponent },
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'cart/:userId', component: CartComponent },
  { path: 'history/:userId', component: HistoryComponent },
  { path: 'trip/:tripId', component: TripComponent },
  { path: 'home', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
