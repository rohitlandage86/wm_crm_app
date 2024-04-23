import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBillReportComponent } from './doctor-bill-report.component';

describe('DoctorBillReportComponent', () => {
  let component: DoctorBillReportComponent;
  let fixture: ComponentFixture<DoctorBillReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorBillReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
