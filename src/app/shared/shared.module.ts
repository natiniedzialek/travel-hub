import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import {RouterModule} from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    NavigationComponent,
    FooterComponent
  ]
})
export class SharedModule { }
