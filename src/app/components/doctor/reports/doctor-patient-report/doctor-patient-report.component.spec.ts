import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientReportComponent } from './doctor-patient-report.component';

describe('DoctorPatientReportComponent', () => {
  let component: DoctorPatientReportComponent;
  let fixture: ComponentFixture<DoctorPatientReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPatientReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorPatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
