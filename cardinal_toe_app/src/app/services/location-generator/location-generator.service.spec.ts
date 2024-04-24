import { TestBed } from '@angular/core/testing';

import { LocatorService } from './location-generator.service';

describe('LocatorService', () => {
  let service: LocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
