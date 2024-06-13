import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

export const ignoreJwtGuard: CanActivateFn = () => {
  const authService$ = inject(AuthService);
  const router$ = inject(Router);

  if (authService$.isAuthenticated()) {
    router$.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
