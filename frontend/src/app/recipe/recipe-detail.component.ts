import {Component} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe.model";

@Component({
    selector: 'recipe-detail',
    template: `
<div>
    <h2 class="text-center" [innerText]="recipe?.title"></h2>
    <h6 class="text-center">Created by {{ recipe?.author }}</h6>
    <div [innerText]="recipe?.instructions">
    
    </div>
</div>
`
})

export class RecipeDetailComponent {

    private recipe: Recipe;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RecipeService
    ) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.service.findById(+params['id']))
            .subscribe((recipe: Recipe) => this.recipe = recipe)
    }
}
