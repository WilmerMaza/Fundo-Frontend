import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ignoreJwtGuard } from './ignore-jwt.guard';

describe('ignoreJwtGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ignoreJwtGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
