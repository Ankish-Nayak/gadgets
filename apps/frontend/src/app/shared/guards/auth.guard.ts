import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.me().subscribe(
    (_res) => {
      authService.updateAuthenticated(true);
      return true;
    },
    (_e) => {
      authService.updateAuthenticated(false);
      router.navigate(['', 'login']);
      return false;
    },
  );

  return true;
};
