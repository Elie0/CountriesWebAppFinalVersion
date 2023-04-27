import { Component, EventEmitter, Output, OnChanges } from '@angular/core';
import { CountryService } from '../country.service';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  showFilterOptions: boolean = false;
  selectedRegion: string[] = [];
  SearchText:string = ''
  constructor(private countryService: CountryService) {}
 

  onSubmit(e: Event) {
    e.preventDefault(); 
  }


  SearchSubmit() {
      this.countryService.filterCountriesBySearchQuery(this.SearchText)  
  }

  toggle()
  {
    this.showFilterOptions = !this.showFilterOptions
  }
 
 // @Output() selectedRegionChange = new EventEmitter<string[]>();
  onRegionSelected(region: string):void{
    if (this.selectedRegion.includes(region)) {
      this.selectedRegion = this.selectedRegion.filter(r => r !== region);
    } else {
      this.selectedRegion = [...this.selectedRegion, region];
    }
    //this.selectedRegionChange.emit(this.selectedRegion);
    
    this.countryService.FilterRegions(this.selectedRegion);
    this.SearchSubmit()
    //console.log(this.selectedRegion)
  }  

 
}