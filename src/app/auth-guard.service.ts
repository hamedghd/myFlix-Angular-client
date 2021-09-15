import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * This function is created to make welcome page inaccessible
 * for the logged in users.
 */

export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('user')) {
      this.router.navigate(['/movies']);
      return false;
    } else {
      return true;
    }
  }
}
