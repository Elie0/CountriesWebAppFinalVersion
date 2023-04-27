      import { Injectable } from '@angular/core';
      import { HttpClient } from '@angular/common/http';
      import { BehaviorSubject, Observable,Subject } from 'rxjs';
      import { Country } from './country';
      @Injectable({
        providedIn: 'root'
      })

      export class CountryService {
        private countries: any[] = [];
        private country:any;
        private detail = new Subject<any>();
        private filterSubject = new BehaviorSubject<Country[]>([]);
        private filteredCountries:Country[] =[];

        constructor(private http: HttpClient) {
          this.getCountryData().subscribe((API:any[]) => {
            console.log(API)
              this.countries = API.map(x => ({
              name: x.name.common,
              flag: x.flags.svg,
              region: x.region,
            }));
            this.filteredCountries = this.countries
            this.filterSubject.next(this.countries);
            console.log(this.countries)
          });
        }
        
        getCountryDetails(name: string):Observable<any>
      {
        this.getCountryDetailsURL(name).subscribe((API: any[]) => {
          console.log(API);
          const data = API[0];
          const use = (Object.keys(data.currencies))[0]
          this.country = {
            name: data.name.common,
            flag: data.flags.svg,
            capital: data.capital[0],
            region: data.region,
            subregion: data.subregion,
            population: data.population,
            languages: Object.values(data.languages).join(', '),
            currencies: data.currencies[use].name + '  ' + data.currencies[use].symbol,
            borders: data.borders
          }
          this.detail.next(this.country);
        })
          
          return this.detail.asObservable();
      }

      getCountryBycodeURL(Code:string):Observable<Country[]> 
      {
              let url = `https://restcountries.com/v3.1/alpha/${Code}`;
              return this.http.get<Country[]>(url)
      }
        

        getCountryData(): Observable<Country[]> {
          let url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,currencies';
          return this.http.get<Country[]>(url)
        }

        getCountryDetailsURL(countryName: string): Observable<Country[]> {
          let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
          return this.http.get<Country[]>(url);
        }

        
        FilterRegions(selectedRegions: string[]):void {
          
          if(selectedRegions.length>0)
            this.filteredCountries = this.countries.filter(country => selectedRegions.includes(country.region));
          else
            this.filteredCountries = this.countries;
          
          this.filterSubject.next(this.filteredCountries);
        
        }
          getFilteredCountries(): Observable<Country[]> {
          return this.filterSubject.asObservable();
        }  

        filterCountriesBySearchQuery(searchQuery: string): void {
           var SearchedCountries:Country[];
           SearchedCountries =this.filteredCountries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()));
           this.filterSubject.next(SearchedCountries)           
        }
        

        resetFilter() {
        //  this.filterSubject.next(this.countries);
      } 
      
    }
