import {Component} from "@angular/core";
import {RecipeService} from "./recipe/recipe.service";
import {Observable} from "rxjs/Observable";

import {Recipe} from "./recipe/recipe.model";

@Component({
    selector: 'cookbook-page',
    template: `
<h2 class="text-center">My Cookbook</h2>
<div>
    <recipe-list [recipes]="recipes"></recipe-list>
</div>
`
})

export class CookbookPageComponent {
    recipes: Observable<Recipe[]>;

    constructor(
        private recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipes = this.recipeService.findByTitle('a');
    }

}
