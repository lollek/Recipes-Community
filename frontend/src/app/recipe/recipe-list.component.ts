import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {RecipeModel} from "./recipe.model";

@Component({
    selector: 'recipe-list',
    template: `
<div>
    RECIPES LIST
    <ul>
    <li *ngFor="let recipe of recipes">
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
    public recipes: Observable<Array<RecipeModel>>;
}

