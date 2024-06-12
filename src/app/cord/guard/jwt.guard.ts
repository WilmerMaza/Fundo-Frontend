
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

export const jwtGuard: CanActivateFn = (route, state) => {

  const authService$ = inject(AuthService);
  const router$ = inject(Router);

  const { url } = state

  if (authService$.isAuthenticated() || url.includes('Public')) {
    return true;
  } else {
    router$.navigate([`/login`], { queryParams: { Platform: url } });
    return false;
  }

};
