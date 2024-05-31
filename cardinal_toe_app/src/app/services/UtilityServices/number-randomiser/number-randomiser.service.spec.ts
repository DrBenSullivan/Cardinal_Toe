import { TestBed } from '@angular/core/testing';

import { NumberRandomiserService } from './number-randomiser.service';

describe('NumberRandomiserService', () => {
  let service: NumberRandomiserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberRandomiserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
