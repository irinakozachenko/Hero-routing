import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService,
    private router: Router) { }

  canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) {return true;}

    this.authService.redirectUrl = url;

    const sessionId = 123456;

    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor'
    };

    return this.router.createUrlTree(['/login'], navigationExtras);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      return this.canActivate(route, state);
    }


}
