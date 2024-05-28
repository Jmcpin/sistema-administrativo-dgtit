import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  //se inyecta asi y ya no en un contructor, porque la nueva sintaxis
  //de la version de angular 16 crea un guardian de manera funcional

  authService.isLoggedIn || router.navigate(["login"]); 
  //si tiene un usuario en localstorage se mantiene, si no tiene nulo en local storage, 
  //se redirecciona al component login
  return true;
};
