import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { Persistence } from 'src/app/services/persistence.service';

export const platformGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot) => {

  const authService$ = inject(AuthService);
  const router$ = inject(Router);
  const persisten$ = inject(Persistence);

  const platformPermit = await firstValueFrom(
    authService$.getDataUser
  );

  if (url.includes(platformPermit.platform)) {
    return true;
  } else {
    persisten$.clearStorage();
    router$.navigate([`/login`]);
    return false;
  }
};
