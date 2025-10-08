import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ Needed for *ngFor, *ngIf
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';  // ✅ or HomePageRoutingModule if you have it
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,       // ✅ Ensures *ngFor and *ngIf work
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
