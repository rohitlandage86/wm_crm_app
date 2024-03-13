import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefComplaintsComponent } from './chief-complaints.component';

describe('ChiefComplaintsComponent', () => {
  let component: ChiefComplaintsComponent;
  let fixture: ComponentFixture<ChiefComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiefComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
