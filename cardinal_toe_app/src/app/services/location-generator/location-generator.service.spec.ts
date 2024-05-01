import { TestBed } from '@angular/core/testing';

import { LocationGeneratorService } from './location-generator.service';

describe('LocatorService', () => {
  let service: LocationGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
