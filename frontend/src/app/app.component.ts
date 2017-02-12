import { Component } from '@angular/core';

@Component({
    selector: 'main-app',
    template: `
<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <a class="navbar-brand" href="#">Start</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Favouries</a>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</nav>
`,
})
export class AppComponent  { }
