import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosagesComponent } from './dosages.component';

describe('DosagesComponent', () => {
  let component: DosagesComponent;
  let fixture: ComponentFixture<DosagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DosagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DosagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
