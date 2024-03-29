import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewSearchPatientComponent } from './doctor-view-search-patient.component';

describe('DoctorViewSearchPatientComponent', () => {
  let component: DoctorViewSearchPatientComponent;
  let fixture: ComponentFixture<DoctorViewSearchPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorViewSearchPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorViewSearchPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
