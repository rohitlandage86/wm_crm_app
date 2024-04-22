import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchBillComponent } from './view-search-bill.component';

describe('ViewSearchBillComponent', () => {
  let component: ViewSearchBillComponent;
  let fixture: ComponentFixture<ViewSearchBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSearchBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSearchBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
