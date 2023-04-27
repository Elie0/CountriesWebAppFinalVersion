import { Component } from '@angular/core';
import { Country } from '../country';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-country-container',
  templateUrl: './country-container.component.html',
  styleUrls: ['./country-container.component.css']
 // changeDetection:ChangeDetectionStrategy.OnPush
})
export class CountryContainerComponent {
  countries: Country[] = []; 
  filteredCountries: Country[] = []; 
  selectedRegion: string[] = [];

  onRegionSelected(regions: string[]) {
    this.selectedRegion = regions;
  }
}