import { TestBed } from '@angular/core/testing';

import { ItemGeneratorService } from './item-generator.service';

describe('ItemGeneratorService', () => {
  let service: ItemGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
