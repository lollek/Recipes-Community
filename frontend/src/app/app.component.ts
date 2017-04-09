import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'main-app',
    template: `
<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <a class="navbar-brand" routerLink="/">Home</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link" routerLink="/mypage" routerLinkActive="active">My page</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" routerLink="/favorites" routerLinkActive="active">Favourites</a>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2"
               type="text"
               placeholder="Search"
               [(ngModel)]="searchQuery"
               [ngModelOptions]="{standalone: true}">
        <button class="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
                (click)="doSearch()"
                [disabled]="!searchQuery">Search</button>
    </form>
</nav>
<div class="container pt-3">
    <router-outlet></router-outlet>
</div>
`,
})

export class AppComponent  {
    private searchQuery: string;

    constructor(
        private router: Router
    ) {
    }

    private doSearch(): void {
        this.router.navigate(['/recipes', 'search', this.searchQuery]);
    }
}
