import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentReportComponent } from './doctor-appointment-report.component';

describe('DoctorAppointmentReportComponent', () => {
  let component: DoctorAppointmentReportComponent;
  let fixture: ComponentFixture<DoctorAppointmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAppointmentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorAppointmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
