import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarratorComponent } from './narrator.component';

describe('NarratorComponent', () => {
  let component: NarratorComponent;
  let fixture: ComponentFixture<NarratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NarratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
