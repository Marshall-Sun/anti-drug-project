import { TestBed } from '@angular/core/testing';

import { TestuserService } from './testuser.service';

describe('TestuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestuserService = TestBed.get(TestuserService);
    expect(service).toBeTruthy();
  });
});
