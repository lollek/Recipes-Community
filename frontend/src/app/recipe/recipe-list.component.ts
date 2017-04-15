import {Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";

import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
    selector: 'recipe-list',
    template: `
<div class="container">
    <div class="row">
        <div class="mx-auto">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let recipe of recipes | async"
                            (click)="onClick(recipe)"
                            class="clickable">
                            <td [innerText]="recipe?.title"></td>
                            <td [innerText]="recipe?.author"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`
})

export class RecipeListComponent {
    recipes: Observable<Recipe[]>;
    queryString: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RecipeService
    ) {
    }

    ngOnInit() {
        this.recipes = this.route.params
            .switchMap((params: Params) => {
                this.queryString = params['query'] as string;
                return this.service.findByTitle(params['query'])
            });
    }

    onClick(recipe: Recipe) {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/recipes', recipe.id]);
    }
}

