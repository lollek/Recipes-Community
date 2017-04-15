import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {Recipe} from "./recipe.model";

@Component({
    selector: 'recipe-list',
    template: `
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
`
})

export class RecipeListComponent {
    @Input() recipes: Observable<Recipe[]>;

    constructor(
        private router: Router
    ) {
    }

    onClick(recipe: Recipe) {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/recipes', recipe.id]);
    }
}

