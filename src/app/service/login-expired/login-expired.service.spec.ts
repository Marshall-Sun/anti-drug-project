import { TestBed } from '@angular/core/testing';

import { LoginExpiredService } from './login-expired.service';

describe('LoginExpiredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginExpiredService = TestBed.get(LoginExpiredService);
    expect(service).toBeTruthy();
  });
});
