import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTreatmentReportComponent } from './doctor-treatment-report.component';

describe('DoctorTreatmentReportComponent', () => {
  let component: DoctorTreatmentReportComponent;
  let fixture: ComponentFixture<DoctorTreatmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorTreatmentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorTreatmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
