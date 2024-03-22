import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateConsultationComponent } from './add-update-consultation.component';

describe('AddUpdateConsultationComponent', () => {
  let component: AddUpdateConsultationComponent;
  let fixture: ComponentFixture<AddUpdateConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
