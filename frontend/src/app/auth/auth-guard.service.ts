import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.authService.loginRedirectUrl = state.url;
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/auth/login']);
        return false;
    }
}