import { TestBed } from '@angular/core/testing';

import { PaperMarkingService } from './paper-marking.service';

describe('PaperMarkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaperMarkingService = TestBed.get(PaperMarkingService);
    expect(service).toBeTruthy();
  });
});
