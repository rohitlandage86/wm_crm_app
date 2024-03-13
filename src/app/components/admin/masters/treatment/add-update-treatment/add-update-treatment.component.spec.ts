import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTreatmentComponent } from './add-update-treatment.component';

describe('AddUpdateTreatmentComponent', () => {
  let component: AddUpdateTreatmentComponent;
  let fixture: ComponentFixture<AddUpdateTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
