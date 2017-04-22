import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './auth/user.model';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'login',
    template: `
    <div class="row">
        <div class="col col-sm-12 col-md-6 mx-auto">
            <h2 class="text-center">Login</h2>
            <div *ngIf="errorMessage" class="alert alert-danger" [innerText]="errorMessage"></div>
            <form (ngSubmit)="login()" #loginForm="ngForm">
                <div class="form-group">
                    <input type="checkbox"
                           [(ngModel)]="register"
                           [ngModelOptions]="{standalone: true}">
                    <span>Register new user?</span>
                </div>
                    
                <div class="form-group row">
                    <label for="username" class="col col-4 col-form-label">Username</label>
                    <div class="col col-8">
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
                </div>
                <div class="form-group row">
                    <label for="password" class="col col-4 col-form-label">Password</label>
                    <div class="col col-8">
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
                </div>
                <button type="submit"
                        class="btn btn-primary"
                        [disabled]="!loginForm.form.valid">Login</button>
            </form>
        </div>
    </div>
`,
})

export class LoginPageComponent  {
    user: User = new User();
    register = false;
    errorMessage: string;

    get loggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    login() {
        event.preventDefault();
        const submitFn: (user: string, password: string) => Observable<boolean> = this.register ?
            this.authService.create.bind(this.authService) :
            this.authService.login.bind(this.authService);

        submitFn(this.user.username, this.user.password).toPromise()
            .then(() => {
                this.user.password = undefined;
                let redirectUrl: string = this.authService.loginRedirectUrl;
                if (!redirectUrl) {
                  redirectUrl = "/cookbook";
                }
                //noinspection JSIgnoredPromiseFromCall
                this.router.navigate([redirectUrl]);
            })
            .catch((error) => {
                this.errorMessage = this.register ? 'Failed to register!' : 'Failed to login!';
                console.log(error);
            });
    };

    logout() {
        this.authService.logout();
    }
}
