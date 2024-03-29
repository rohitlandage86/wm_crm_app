import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLeadReportComponent } from './doctor-lead-report.component';

describe('DoctorLeadReportComponent', () => {
  let component: DoctorLeadReportComponent;
  let fixture: ComponentFixture<DoctorLeadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorLeadReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorLeadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
