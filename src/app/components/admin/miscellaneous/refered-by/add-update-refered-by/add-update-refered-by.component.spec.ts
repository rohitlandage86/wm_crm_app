import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReferedByComponent } from './add-update-refered-by.component';

describe('AddUpdateReferedByComponent', () => {
  let component: AddUpdateReferedByComponent;
  let fixture: ComponentFixture<AddUpdateReferedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateReferedByComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateReferedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
