import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'login',
    template: `
<div>
    <div class="row">
        <div class="col-sm-12 col-md-6 mx-auto">
            <div *ngIf="!loggedIn">
                <h2>Login</h2>
                <div *ngIf="errorMessage" class="alert alert-danger" [innerText]="errorMessage"></div>
                <form (ngSubmit)="login()" #loginForm="ngForm">
                    <div class="form-group">
                        <label for="register">Register new user?</label>
                        <input type="checkbox"
                               id="register"
                               [(ngModel)]="register"
                               [ngModelOptions]="{standalone: true}">
                   </div>
                        
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
            <div *ngIf="loggedIn">
                <button type="button" class="btn btn-primary" (click)="logout()">Logout</button>
            </div>
        </div>
    </div>
</div>
`,
})

export class LoginComponent  {
    user: User = new User();
    register: boolean = false;
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
                const redirectUrl: string = this.authService.loginRedirectUrl;
                if (redirectUrl) {
                    //noinspection JSIgnoredPromiseFromCall
                    this.router.navigate([redirectUrl]);
                }
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
