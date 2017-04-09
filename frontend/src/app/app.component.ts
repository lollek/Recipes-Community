import {Component} from '@angular/core';

@Component({
    selector: 'main-app',
    template: `
<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <a class="navbar-brand" routerLink="/">Start</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link" routerLink="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" routerLink="/favorites" routerLinkActive="active">Favouries</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</nav>
<div class="container pt-3">
    <router-outlet></router-outlet>
</div>
`,
})

export class AppComponent  { }
