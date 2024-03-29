import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAppointmentReportComponent } from './receptionist-appointment-report.component';

describe('ReceptionistAppointmentReportComponent', () => {
  let component: ReceptionistAppointmentReportComponent;
  let fixture: ComponentFixture<ReceptionistAppointmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistAppointmentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistAppointmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
