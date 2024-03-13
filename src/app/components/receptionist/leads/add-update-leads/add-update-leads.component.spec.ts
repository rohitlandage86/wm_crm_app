import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLeadsComponent } from './add-update-leads.component';

describe('AddUpdateLeadsComponent', () => {
  let component: AddUpdateLeadsComponent;
  let fixture: ComponentFixture<AddUpdateLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
