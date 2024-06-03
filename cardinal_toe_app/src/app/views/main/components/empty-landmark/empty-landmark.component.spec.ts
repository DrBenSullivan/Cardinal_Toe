import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLandmarkComponent } from './empty-landmark.component';

describe('EmptyLandmarkComponent', () => {
  let component: EmptyLandmarkComponent;
  let fixture: ComponentFixture<EmptyLandmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyLandmarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyLandmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
