import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDosagesComponent } from './add-update-dosages.component';

describe('AddUpdateDosagesComponent', () => {
  let component: AddUpdateDosagesComponent;
  let fixture: ComponentFixture<AddUpdateDosagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateDosagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateDosagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
