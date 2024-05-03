import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwPatientDetailsComponent } from './veiw-patient-details.component';

describe('VeiwPatientDetailsComponent', () => {
  let component: VeiwPatientDetailsComponent;
  let fixture: ComponentFixture<VeiwPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiwPatientDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeiwPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
