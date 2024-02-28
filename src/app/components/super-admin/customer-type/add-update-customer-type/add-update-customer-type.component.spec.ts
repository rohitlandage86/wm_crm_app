import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCustomerTypeComponent } from './add-update-customer-type.component';

describe('AddUpdateCustomerTypeComponent', () => {
  let component: AddUpdateCustomerTypeComponent;
  let fixture: ComponentFixture<AddUpdateCustomerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateCustomerTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateCustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
