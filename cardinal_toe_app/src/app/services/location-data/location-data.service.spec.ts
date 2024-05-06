import { TestBed } from '@angular/core/testing';

import { LocationDataFetcherService } from './location-data.service';

describe('LocationDataFetcherService', () => {
  let service: LocationDataFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDataFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
