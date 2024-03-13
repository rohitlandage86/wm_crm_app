import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTitleComponent } from './add-update-title.component';

describe('AddUpdateTitleComponent', () => {
  let component: AddUpdateTitleComponent;
  let fixture: ComponentFixture<AddUpdateTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
