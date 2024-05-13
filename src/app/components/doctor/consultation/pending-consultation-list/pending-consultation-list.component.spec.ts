import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingConsultationListComponent } from './pending-consultation-list.component';

describe('PendingConsultationListComponent', () => {
  let component: PendingConsultationListComponent;
  let fixture: ComponentFixture<PendingConsultationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingConsultationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingConsultationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
