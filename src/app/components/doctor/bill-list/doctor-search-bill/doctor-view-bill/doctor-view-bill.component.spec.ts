import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewBillComponent } from './doctor-view-bill.component';

describe('DoctorViewBillComponent', () => {
  let component: DoctorViewBillComponent;
  let fixture: ComponentFixture<DoctorViewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorViewBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorViewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
