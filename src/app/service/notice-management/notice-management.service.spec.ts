import { TestBed } from '@angular/core/testing';

import { NoticeManagementService } from './notice-management.service';

describe('NoticeManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticeManagementService = TestBed.get(NoticeManagementService);
    expect(service).toBeTruthy();
  });
});
