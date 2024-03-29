import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFollowUpReportComponent } from './doctor-follow-up-report.component';

describe('DoctorFollowUpReportComponent', () => {
  let component: DoctorFollowUpReportComponent;
  let fixture: ComponentFixture<DoctorFollowUpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorFollowUpReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorFollowUpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
