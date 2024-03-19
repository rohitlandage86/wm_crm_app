import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReceptionistDashboardComponent } from './add-update-receptionist-dashboard.component';

describe('AddUpdateReceptionistDashboardComponent', () => {
  let component: AddUpdateReceptionistDashboardComponent;
  let fixture: ComponentFixture<AddUpdateReceptionistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateReceptionistDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateReceptionistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
