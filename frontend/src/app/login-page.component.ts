import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'login',
    template: `
<button class="btn btn-primary" (click)="login()">Login with facebook</button>
`,
})

export class LoginPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.authService.me().subscribe( result => result ? this.redirect() : undefined);
    }

    login() {
        this.authService.login().subscribe( result => result ? this.redirect() : undefined);
    }

    private redirect(): void {
        const route = this.authService.loginRedirectUrl || '/';
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate([route]);
    }
}
