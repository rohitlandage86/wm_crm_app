import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistBillReportComponent } from './receptionist-bill-report.component';

describe('ReceptionistBillReportComponent', () => {
  let component: ReceptionistBillReportComponent;
  let fixture: ComponentFixture<ReceptionistBillReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistBillReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
