import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCustomersComponent } from './add-update-customers.component';

describe('AddUpdateCustomersComponent', () => {
  let component: AddUpdateCustomersComponent;
  let fixture: ComponentFixture<AddUpdateCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
