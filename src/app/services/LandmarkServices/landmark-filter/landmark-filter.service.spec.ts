import { TestBed } from '@angular/core/testing';

import { LandmarkFilterService } from './landmark-filter.service';

describe('LandmarkGeneratorService', () => {
  let service: LandmarkFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandmarkFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
