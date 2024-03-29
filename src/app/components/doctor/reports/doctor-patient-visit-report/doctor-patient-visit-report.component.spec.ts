import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientVisitReportComponent } from './doctor-patient-visit-report.component';

describe('DoctorPatientVisitReportComponent', () => {
  let component: DoctorPatientVisitReportComponent;
  let fixture: ComponentFixture<DoctorPatientVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPatientVisitReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorPatientVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
