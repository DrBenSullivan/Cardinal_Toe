import { TestBed } from '@angular/core/testing';

import { LandmarksService } from './landmark-sentence.service';

describe('LandmarksService', () => {
  let service: LandmarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandmarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
