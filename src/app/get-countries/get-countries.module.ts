import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCountriesComponent } from './get-countries.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GetCountriesComponent }]),
  ],
  exports: []

})
export class GetCountriesModule { }
