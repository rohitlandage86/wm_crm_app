import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchLeadsComponent } from './view-search-leads.component';

describe('ViewSearchLeadsComponent', () => {
  let component: ViewSearchLeadsComponent;
  let fixture: ComponentFixture<ViewSearchLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSearchLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSearchLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
