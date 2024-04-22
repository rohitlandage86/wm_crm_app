import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBillComponent } from './add-update-bill.component';

describe('AddUpdateBillComponent', () => {
  let component: AddUpdateBillComponent;
  let fixture: ComponentFixture<AddUpdateBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
