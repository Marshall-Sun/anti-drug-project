import { TestBed } from '@angular/core/testing';

import { CourseInfService } from './courseinf-frontend.service';

describe('CourseinfFrontendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseInfService = TestBed.get(CourseInfService);
    expect(service).toBeTruthy();
  });
});
