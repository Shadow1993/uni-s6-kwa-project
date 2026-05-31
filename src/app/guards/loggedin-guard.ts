import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'app/services/login/login-service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  if (loginService.isLoggedIn()) {
    if (route.routeConfig?.path === "login") {
      router.navigate([""]);
      return false;
    }
    return true;
  } else {
    if (route.routeConfig?.path === "login") {
      return true;
    }
    router.navigate(["login"]);
  }
  return false;

};
