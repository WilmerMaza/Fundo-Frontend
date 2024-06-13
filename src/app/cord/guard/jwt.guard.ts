
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

export const jwtGuard: CanActivateFn = (route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot) => {

  const authService$ = inject(AuthService);
  const router$ = inject(Router);


  if (authService$.isAuthenticated() || url.includes('Public')) {
    return true;
  } else {
    router$.navigate([`/login`], { queryParams: { Platform: url } });
    return false;
  }

};
