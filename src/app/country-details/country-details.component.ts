import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../country.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  public country: any;
  public neighbors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') || '';

    this.FetchDetails(name);
  }

  FetchDetails(name: string): void {
    if (name) {
      this.countryService.getCountryDetails(name).pipe(
        switchMap((x: any) => {  // without switchmap i was having unexpected errors, like displaying all previous borders, switchMap is used in this case to cancel the previous request when a new request is made. For example, when the user navigates to a new country, the FetchDetails method is called with the new country name. If a previous request was still in progress, switchMap will cancel that request and start a new one.
          this.country = x;
          const borders = x.borders;

          if (borders) {
            return forkJoin(
              borders.map((border: string) => {
                return this.countryService.getCountryBycodeURL(border);
              })
            );
          } else {
            this.neighbors = [];
            return [];
          }
        })
      ).subscribe({
        next: (neighbors: any) => {
  
            this.neighbors = neighbors.map((neighbor:any) => {
              return {
                name: neighbor[0].name.common,
                flags: neighbor[0].flags.svg,
                region: neighbor[0].region
              };
            });
          
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
      
  }

  trackByFn(index: number, neighbor: any): string {
    return neighbor.name;
  }
  

  goToCountryDetailsByName(countryName: string): void {
    this.router.navigate(['/country-details', countryName]);
    this.FetchDetails(countryName);
  }

  goBack(): void {
    this.router.navigate(['/countries']);
  }
}



