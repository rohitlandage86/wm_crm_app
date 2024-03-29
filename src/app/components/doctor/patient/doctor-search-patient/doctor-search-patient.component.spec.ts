import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchPatientComponent } from './doctor-search-patient.component';

describe('DoctorSearchPatientComponent', () => {
  let component: DoctorSearchPatientComponent;
  let fixture: ComponentFixture<DoctorSearchPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSearchPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
