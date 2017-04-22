import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe/recipe.service';
import {Observable} from 'rxjs/Observable';

import {Recipe} from './recipe/recipe.model';
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'cookbook-page',
    template: `
<h2 class="text-center">My Cookbook</h2>
<div>
    <recipe-table [recipes]="recipes"></recipe-table>
</div>
`
})

export class CookbookPageComponent implements OnInit {
    recipes: Observable<Recipe[]>;

    constructor(
        private recipeService: RecipeService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.recipes = this.recipeService.findByAuthor(this.authService.user);
    }

}
