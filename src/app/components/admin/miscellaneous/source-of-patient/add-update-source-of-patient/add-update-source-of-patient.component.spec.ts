import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSourceOfPatientComponent } from './add-update-source-of-patient.component';

describe('AddUpdateSourceOfPatientComponent', () => {
  let component: AddUpdateSourceOfPatientComponent;
  let fixture: ComponentFixture<AddUpdateSourceOfPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateSourceOfPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateSourceOfPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
