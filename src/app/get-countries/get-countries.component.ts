import { Component,OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-get-countries',
  templateUrl: './get-countries.component.html',
  styleUrls: ['./get-countries.component.css'],
})
export class GetCountriesComponent implements OnInit{ 
  //@Input() selectedRegion: string[] = [];
  countries: any[] = [];
  text:any = '';
  private subscription:any;


  constructor(private countryService: CountryService,private router: Router) { }
  ngOnInit(): void {
    this.subscription= this.countryService.getFilteredCountries().pipe(
      map((x:any) => {this.countries = x;})
    ).subscribe();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.countryService.resetFilter();
  }

  goToCountryDetailsByName(countryName: string): void {
    this.router.navigate(['/countries/name', countryName]);
  }

  trackByCountry(index: number, country: any): string {
    return country.name; 
  }
  



}