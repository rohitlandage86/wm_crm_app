import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistFollowUpReportComponent } from './receptionist-follow-up-report.component';

describe('ReceptionistFollowUpReportComponent', () => {
  let component: ReceptionistFollowUpReportComponent;
  let fixture: ComponentFixture<ReceptionistFollowUpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistFollowUpReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionistFollowUpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
