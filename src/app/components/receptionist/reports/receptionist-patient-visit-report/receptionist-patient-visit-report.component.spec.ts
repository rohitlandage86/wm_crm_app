import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistPatientVisitReportComponent } from './receptionist-patient-visit-report.component';

describe('ReceptionistPatientVisitReportComponent', () => {
  let component: ReceptionistPatientVisitReportComponent;
  let fixture: ComponentFixture<ReceptionistPatientVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistPatientVisitReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistPatientVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
