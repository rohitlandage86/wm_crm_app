import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistPatientReportComponent } from './receptionist-patient-report.component';

describe('ReceptionistPatientReportComponent', () => {
  let component: ReceptionistPatientReportComponent;
  let fixture: ComponentFixture<ReceptionistPatientReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistPatientReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistPatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
