import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
    selector: 'app-root',
    template: `
<nav class="navbar navbar-toggleable navbar-light bg-faded">
    <a class="navbar-brand" routerLink="/">Home</a>
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" routerLink="/cookbook" routerLinkActive="active">Cookbook</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" routerLink="/newrecipe" routerLinkActive="active">New Recipe</a>
        </li>
    </ul>
    <form class="form-inline">
        <div class="input-group">
            <input class="form-control"
                   type="text"
                   placeholder="Search for recipes"
                   [(ngModel)]="searchQuery"
                   [ngModelOptions]="{standalone: true}">
            <div class="input-group-btn">
                <button class="btn btn-default"
                        type="submit"
                        (click)="doSearch()"
                        [disabled]="!searchQuery">
                            <span class="fa fa-search"></span>
                </button>
            </div>
        </div>
    </form>
    <div>
        <a *ngIf="!isLoggedIn" class="nav-link" routerLink="/login">
            <span class="fa fa-sign-in"></span>
            Login
        </a>
        <a *ngIf="isLoggedIn" class="nav-link" (click)="logout()" routerLink="/">
            <span class="fa fa-sign-out"></span>
            Logout
        </a>
    </div>
</nav>
<div class="container pt-3">
    <router-outlet></router-outlet>
</div>
`,
})

export class AppComponent  {
    private searchQuery: string;

    private get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    private doSearch(): void {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/search', this.searchQuery]);
    }

    private logout(): void {
        this.authService.logout();
    }
}
