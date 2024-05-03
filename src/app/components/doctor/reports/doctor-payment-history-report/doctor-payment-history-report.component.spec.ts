import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPaymentHistoryReportComponent } from './doctor-payment-history-report.component';

describe('DoctorPaymentHistoryReportComponent', () => {
  let component: DoctorPaymentHistoryReportComponent;
  let fixture: ComponentFixture<DoctorPaymentHistoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPaymentHistoryReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorPaymentHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
