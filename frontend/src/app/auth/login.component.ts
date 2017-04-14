import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {User} from "./user.model";
import {AuthService} from "./auth.service";

@Component({
    selector: 'login',
    template: `
<div>
    <div class="row">
        <div class="col-sm-12 col-md-6 mx-auto">
            <h2>Login</h2>
            <div *ngIf="errorMessage" class="alert alert-danger" [innerText]="errorMessage"></div>
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input placeholder="Username"
                           type="text"
                           id="username"
                           name="username"
                           class="form-control"
                           [(ngModel)]="user.username"
                           #username="ngModel"
                           required>
                    <div [hidden]="username.valid || username.pristine"
                         class="alert alert-danger">Username is invalid</div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input placeholder="Password"
                           type="password"
                           id="password"
                           name="password"
                           class="form-control"
                           [(ngModel)]="user.password"
                           #password="ngModel"
                           required>
                    <div [hidden]="password.valid || password.pristine"
                         class="alert alert-danger">Password is invalid</div>
                </div>
                <button type="submit"
                        class="btn btn-primary"
                        [disabled]="!loginForm.form.valid">Login</button>
            </form>
        </div>
    </div>
</div>
`,
})

export class LoginComponent  {
    user: User = new User();
    errorMessage: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    onSubmit() {
        this.authService.login(this.user.username, this.user.password).subscribe(() =>
            ok => {
                let redirectUrl: string = this.authService.loginRedirectUrl;
                if (!redirectUrl) {
                    redirectUrl = '/';
                }
                //noinspection JSIgnoredPromiseFromCall
                this.router.navigate([redirectUrl]);
            },
            error => {
                this.errorMessage = 'Failed to login!';
                console.log(error);
            }
        );
    };
}
