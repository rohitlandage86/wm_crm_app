import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferedByComponent } from './refered-by.component';

describe('ReferedByComponent', () => {
  let component: ReferedByComponent;
  let fixture: ComponentFixture<ReferedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferedByComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
