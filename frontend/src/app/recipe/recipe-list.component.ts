import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Recipe} from './recipe.model';

@Component({
    selector: 'recipe-list',
    template: `
<ul class="list-group">
    <a *ngFor="let recipe of (recipes | async)" routerLink="/recipes/{{ recipe.id }}">
        <li class="list-group-item">
            <span class="font-weight-bold" [innerText]="recipe?.title"></span>
            <span>&nbsp;by&nbsp;</span>
            <span class="font-weight-bold" [innerText]="recipe?.author"></span>
        </li>
    </a>
</ul>
`
})

export class RecipeListComponent {
    @Input() recipes: Observable<Recipe[]>;
}
