import { TestBed } from '@angular/core/testing';

import { RouteTextGeneratorService } from './route-text-generator.service';

describe('RouteTextGeneratorService', () => {
  let service: RouteTextGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteTextGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
