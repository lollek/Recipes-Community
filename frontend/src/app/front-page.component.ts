import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'front-page',
    template: `
<h2 class="text-center">Search</h2>
<form class="p-3">
    <div class="row justify-content-center">
        <div class="col col-auto p-1">
            <input class="form-control"
                   type="text"
                   placeholder="Search for recipes"
                   [(ngModel)]="searchQuery"
                   [ngModelOptions]="{standalone: true}">
        </div>
        <div class="col col-auto p-1">
            <button class="btn btn-outline-primary"
                    type="submit"
                    (click)="doSearch()"
                    [disabled]="!searchQuery">Search</button>
        </div>
    </div>
</form>
<div class="p-3 row">
    <div class="col col-xs-6">
        <h2 class="text-center">Popular recipes</h2>
    </div>
    <div class="col col-xs-6">
        <h2 class="text-center">Newest recipes</h2>
    </div>
</div>
`,
})

export class FrontPageComponent {
    private searchQuery: string;

    constructor(
        private router: Router) {
    }

    private doSearch(): void {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/search', this.searchQuery]);
    }
}
