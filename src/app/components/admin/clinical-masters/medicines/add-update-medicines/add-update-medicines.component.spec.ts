import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMedicinesComponent } from './add-update-medicines.component';

describe('AddUpdateMedicinesComponent', () => {
  let component: AddUpdateMedicinesComponent;
  let fixture: ComponentFixture<AddUpdateMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateMedicinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
