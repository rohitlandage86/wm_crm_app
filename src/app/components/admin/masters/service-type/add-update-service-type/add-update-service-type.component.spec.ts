import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateServiceTypeComponent } from './add-update-service-type.component';

describe('AddUpdateServiceTypeComponent', () => {
  let component: AddUpdateServiceTypeComponent;
  let fixture: ComponentFixture<AddUpdateServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateServiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
