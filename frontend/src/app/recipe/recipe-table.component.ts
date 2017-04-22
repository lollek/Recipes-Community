import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {Recipe} from './recipe.model';

@Component({
    selector: 'recipe-table',
    template: `
<div *ngIf="showFilters" class="p-3 row justify-content-center">
    <div class="col col-auto">
        <div class="form-group row">
            <label for="text-filter"
                   class="col col-4 col-form-label">Text filter</label>
            <input type="text"
                   id="text-filter"
                   placeholder="Text filter"
                   class="form-control col col-8"
                   [formControl]="textFilterControl">
        </div>
        <div class="row">
            <div class="col col-4">
                <input type="radio"
                       name="showWhichRecipes"
                       value="mine"
                       [(ngModel)]="recipeTypes"
                       disabled>
                <span>Show my recipes</span>
            </div>
            <div class="col col-4">
                <input type="radio"
                       name="showWhichRecipes"
                       value="others"
                       [(ngModel)]="recipeTypes"
                       disabled>
                <span>Show others' recipes</span>
            </div>
            <div class="col col-4">
                <input type="radio"
                       name="showWhichRecipes"
                       value="all"
                       [(ngModel)]="recipeTypes">
                <span>Show all recipes</span>
            </div>
        </div>
    </div>
</div>
<div class="table-responsive">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let recipe of (filteredRecipes | async)"
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

export class RecipeTableComponent implements OnInit {
    @Input() recipes: Observable<Recipe[]>;
    @Input() showFilters = true;

    private filteredRecipes: Observable<Recipe[]>;
    private textFilterControl: FormControl = new FormControl();
    private recipeTypes = 'all';

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.filteredRecipes = this.textFilterControl.valueChanges
            .startWith(undefined)
            .debounceTime(100)
            .distinctUntilChanged()
            .combineLatest(this.recipes, (filterText, recipes) => {
                if (filterText) {
                    recipes = recipes.filter((recipe: Recipe) =>
                        recipe.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
                }
                return recipes;
            });
    }

    private onClick(recipe: Recipe) {
        //noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/recipes', recipe.id]);
    }
}
