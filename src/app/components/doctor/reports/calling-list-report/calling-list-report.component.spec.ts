import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingListReportComponent } from './calling-list-report.component';

describe('CallingListReportComponent', () => {
  let component: CallingListReportComponent;
  let fixture: ComponentFixture<CallingListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallingListReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallingListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
