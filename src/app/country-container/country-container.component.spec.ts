import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryContainerComponent } from './country-container.component';

describe('CountryContainerComponent', () => {
  let component: CountryContainerComponent;
  let fixture: ComponentFixture<CountryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
