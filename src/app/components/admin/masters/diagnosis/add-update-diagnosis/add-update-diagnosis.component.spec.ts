import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDiagnosisComponent } from './add-update-diagnosis.component';

describe('AddUpdateDiagnosisComponent', () => {
  let component: AddUpdateDiagnosisComponent;
  let fixture: ComponentFixture<AddUpdateDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateDiagnosisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
