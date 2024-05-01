import { TestBed } from '@angular/core/testing';

import { SessionStateService } from './session-state.service';

describe('SessionStateService', () => {
  let service: SessionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
