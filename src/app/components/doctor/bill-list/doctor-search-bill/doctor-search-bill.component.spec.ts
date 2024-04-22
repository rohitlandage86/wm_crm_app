import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchBillComponent } from './doctor-search-bill.component';

describe('DoctorSearchBillComponent', () => {
  let component: DoctorSearchBillComponent;
  let fixture: ComponentFixture<DoctorSearchBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSearchBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
