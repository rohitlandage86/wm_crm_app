import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFollowupComponent } from './pending-followup.component';

describe('PendingFollowupComponent', () => {
  let component: PendingFollowupComponent;
  let fixture: ComponentFixture<PendingFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingFollowupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
