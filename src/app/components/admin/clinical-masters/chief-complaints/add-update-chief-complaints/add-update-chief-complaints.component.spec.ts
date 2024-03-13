import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateChiefComplaintsComponent } from './add-update-chief-complaints.component';

describe('AddUpdateChiefComplaintsComponent', () => {
  let component: AddUpdateChiefComplaintsComponent;
  let fixture: ComponentFixture<AddUpdateChiefComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateChiefComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateChiefComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
