import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryContainerComponent } from './country-container.component';
import { GetCountriesComponent } from '../get-countries/get-countries.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CountryContainerComponent,TimelineComponent,GetCountriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CountryContainerComponent }]),
    FormsModule
  ],

  exports: [
    CountryContainerComponent
  ]
})

export class CountryContainerModule { }
