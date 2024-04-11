import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFollowUpListComponent } from './doctor-follow-up-list.component';

describe('DoctorFollowUpListComponent', () => {
  let component: DoctorFollowUpListComponent;
  let fixture: ComponentFixture<DoctorFollowUpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorFollowUpListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorFollowUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
