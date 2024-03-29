import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewSearchLeadComponent } from './doctor-view-search-lead.component';

describe('DoctorViewSearchLeadComponent', () => {
  let component: DoctorViewSearchLeadComponent;
  let fixture: ComponentFixture<DoctorViewSearchLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorViewSearchLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorViewSearchLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
