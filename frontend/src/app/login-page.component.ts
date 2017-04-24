import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'login',
    template: `
<button class="btn btn-primary" (click)="login()">Login with facebook</button>
`,
})

export class LoginPageComponent  {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    login() {
        this.authService.login().subscribe(
            result => {
                if (result) {
                    let url = this.authService.loginRedirectUrl;
                    if (!url) {
                        url = '/';
                    }
                    this.router.navigate([url])
                }
            }
        )
    }
}
