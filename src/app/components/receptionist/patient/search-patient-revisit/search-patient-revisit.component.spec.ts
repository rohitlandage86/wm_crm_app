import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatientRevisitComponent } from './search-patient-revisit.component';

describe('SearchPatientRevisitComponent', () => {
  let component: SearchPatientRevisitComponent;
  let fixture: ComponentFixture<SearchPatientRevisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPatientRevisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPatientRevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
