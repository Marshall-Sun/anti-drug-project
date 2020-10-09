import { TestBed } from '@angular/core/testing';

import { WebsitesAnnouncementService } from './websites-announcement.service';

describe('WebsitesAnnouncementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsitesAnnouncementService = TestBed.get(WebsitesAnnouncementService);
    expect(service).toBeTruthy();
  });
});
