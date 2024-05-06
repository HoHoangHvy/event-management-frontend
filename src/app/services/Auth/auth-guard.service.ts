import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import {Observable} from "rxjs";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
