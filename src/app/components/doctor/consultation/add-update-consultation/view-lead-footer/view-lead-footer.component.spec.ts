import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeadFooterComponent } from './view-lead-footer.component';

describe('ViewLeadFooterComponent', () => {
  let component: ViewLeadFooterComponent;
  let fixture: ComponentFixture<ViewLeadFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLeadFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLeadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
