import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import {Recipe} from "./recipe/recipe.model";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "./recipe/recipe.service";

@Component({
    selector: 'search-results',
    template: `
<div class="container">
    <div class="row">
        <div class="mx-auto">
            <h2 class="text-center">Results containing '{{ queryString }}'</h2>
            <div class="p-3">
                <recipe-list [recipes]="recipes"></recipe-list>
            </div>
        </div>
    </div>
</div>
`
})

export class SearchResultsComponent {
    recipes: Observable<Recipe[]>;
    queryString: string;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipes = this.route.params
            .switchMap((params: Params) => {
                this.queryString = params['query'] as string;
                return this.recipeService.findByTitle(params['query'])
            });
    }
}
