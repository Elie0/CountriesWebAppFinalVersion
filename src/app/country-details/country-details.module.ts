import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailsComponent } from './country-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CountryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CountryDetailsComponent }]),
  ],

  exports: [
    CountryDetailsComponent
  ]
})
export class CountryDetailsModule { }
