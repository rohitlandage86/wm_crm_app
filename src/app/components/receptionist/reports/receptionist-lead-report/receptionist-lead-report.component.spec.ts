import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistLeadReportComponent } from './receptionist-lead-report.component';

describe('ReceptionistLeadReportComponent', () => {
  let component: ReceptionistLeadReportComponent;
  let fixture: ComponentFixture<ReceptionistLeadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistLeadReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistLeadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
