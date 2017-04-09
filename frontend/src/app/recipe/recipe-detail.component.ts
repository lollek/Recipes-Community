import {Component} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe.model";

@Component({
    selector: 'recipe-detail',
    template: `
<div>
    <h2>RECIPE DETAIL COMPONENT</h2>
    <div><span>id</span><span [innerText]="recipe?.id"></span></div>
    <div><span>title</span><span [innerText]="recipe?.title"></span></div>
    <div><span>instructions</span><span [innerText]="recipe?.instructions"></span></div>
    <div><span>author</span><span [innerText]="recipe?.author"></span></div>
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
