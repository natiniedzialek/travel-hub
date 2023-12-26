import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import {RouterModule} from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    CommonModule,
    NavigationComponent,
    FooterComponent
  ]
})
export class SharedModule { }
