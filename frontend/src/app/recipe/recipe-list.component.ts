import {Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
    selector: 'recipe-list',
    template: `
<div>
    RECIPES LIST
    <ul>
    <li *ngFor="let recipe of recipes | async"
        (click)="onClick(recipe)">
        
        <div><span>id</span><span [innerText]="recipe.id"></span></div>
        <div><span>title</span><span [innerText]="recipe.title"></span></div>
        <div><span>instructions</span><span [innerText]="recipe.instructions"></span></div>
        <div><span>author</span><span [innerText]="recipe.author"></span></div>
    </li>
    </ul>
</div>
`
})

export class RecipeListComponent {
    public recipes: Observable<Array<Recipe>>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RecipeService
    ) {
    }

    ngOnInit() {
    }

    public onClick(recipe: Recipe) {
        this.router.navigate(['/recipes'], recipe.id);
    }
}

