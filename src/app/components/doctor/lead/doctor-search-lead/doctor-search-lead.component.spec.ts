import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchLeadComponent } from './doctor-search-lead.component';

describe('DoctorSearchLeadComponent', () => {
  let component: DoctorSearchLeadComponent;
  let fixture: ComponentFixture<DoctorSearchLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSearchLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
