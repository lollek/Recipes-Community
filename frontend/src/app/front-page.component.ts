import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Recipe} from './recipe/recipe.model';
import {RecipeService} from './recipe/recipe.service';

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
        <h4>Popular recipes</h4>
        <recipe-list [recipes]="popularRecipes"></recipe-list>
    </div>
    <div class="col col-xs-6">
        <h4>Newest recipes</h4>
        <recipe-list [recipes]="newestRecipes"></recipe-list>
    </div>
</div>
`,
})

export class FrontPageComponent implements OnInit {
    private searchQuery: string;
    private popularRecipes: Observable<Recipe[]>;
    private newestRecipes: Observable<Recipe[]>;

    constructor(
        private router: Router,
        private recipeService: RecipeService) {
    }

    ngOnInit() {
        this.popularRecipes = this.recipeService.popular();
        this.newestRecipes = this.recipeService.newest();
    }

    private doSearch(): void {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/search', this.searchQuery]);
    }
}
