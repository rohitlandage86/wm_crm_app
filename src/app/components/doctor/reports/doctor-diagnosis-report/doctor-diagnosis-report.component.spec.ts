import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDiagnosisReportComponent } from './doctor-diagnosis-report.component';

describe('DoctorDiagnosisReportComponent', () => {
  let component: DoctorDiagnosisReportComponent;
  let fixture: ComponentFixture<DoctorDiagnosisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDiagnosisReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorDiagnosisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
