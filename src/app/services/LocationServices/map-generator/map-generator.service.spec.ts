import { TestBed } from '@angular/core/testing';

import { MapGeneratorService } from './map-generator.service';

describe('MapGeneratorService', () => {
  let service: MapGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
