import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBillDoctorComponent } from './add-update-bill-doctor.component';

describe('AddUpdateBillDoctorComponent', () => {
  let component: AddUpdateBillDoctorComponent;
  let fixture: ComponentFixture<AddUpdateBillDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateBillDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateBillDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
