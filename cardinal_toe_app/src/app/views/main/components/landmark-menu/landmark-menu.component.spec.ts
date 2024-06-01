import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkMenuComponent } from './landmark-menu.component';

describe('LandmarkMenuComponent', () => {
  let component: LandmarkMenuComponent;
  let fixture: ComponentFixture<LandmarkMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandmarkMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandmarkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
