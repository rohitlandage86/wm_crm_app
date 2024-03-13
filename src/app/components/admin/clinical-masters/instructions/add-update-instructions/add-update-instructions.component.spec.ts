import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateInstructionsComponent } from './add-update-instructions.component';

describe('AddUpdateInstructionsComponent', () => {
  let component: AddUpdateInstructionsComponent;
  let fixture: ComponentFixture<AddUpdateInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateInstructionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
