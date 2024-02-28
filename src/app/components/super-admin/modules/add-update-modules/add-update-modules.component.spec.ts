import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateModulesComponent } from './add-update-modules.component';

describe('AddUpdateModulesComponent', () => {
  let component: AddUpdateModulesComponent;
  let fixture: ComponentFixture<AddUpdateModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
