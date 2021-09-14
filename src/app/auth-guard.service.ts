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

  constructor() { }
  canActivate() {
    const username = localStorage.getItem('user');

    if (username == '') {
      return true;
    } else {
      return false;
    }
  }
}
