import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationMenuComponent } from '../../components/new-location-menu/new-location-menu.component';

describe('LocationMenuComponent', () => {
  let component: NewLocationMenuComponent;
  let fixture: ComponentFixture<NewLocationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLocationMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewLocationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
