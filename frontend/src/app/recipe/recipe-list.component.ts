import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";

import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
    selector: 'recipe-list',
    template: `
<div>
    RECIPES LIST
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let recipe of recipes | async"
                (click)="onClick(recipe)">
                <td [innerText]="recipe?.id"></td>
                <td [innerText]="recipe?.title"></td>
                <td [innerText]="recipe?.author"></td>
            </tr>
        </tbody>
    </table>
</div>
`
})

export class RecipeListComponent {
    public recipes: Observable<Recipe[]>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipes = this.route.params
            .switchMap((params: Params) => this.service.findByTitle(params['query']));
    }

    public onClick(recipe: Recipe) {
        this.router.navigate(['/recipes', recipe.id]);
    }
}

