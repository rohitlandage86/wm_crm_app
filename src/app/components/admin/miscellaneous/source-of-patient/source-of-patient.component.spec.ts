import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOfPatientComponent } from './source-of-patient.component';

describe('SourceOfPatientComponent', () => {
  let component: SourceOfPatientComponent;
  let fixture: ComponentFixture<SourceOfPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceOfPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SourceOfPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
