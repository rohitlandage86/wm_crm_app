import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchPatientComponent } from './view-search-patient.component';

describe('ViewSearchPatientComponent', () => {
  let component: ViewSearchPatientComponent;
  let fixture: ComponentFixture<ViewSearchPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSearchPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSearchPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
