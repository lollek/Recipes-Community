import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';
import {Ingredient} from './ingredient.model';

@Component({
    selector: 'recipe-detail-edit',
    template: `
<form #recipeForm="ngForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               id="title"
               class="form-control"
               name="title"
               [(ngModel)]="recipe.title"
               #title="ngModel"
               required>
        <div [hidden]="title.valid || title.pristine"
              class="alert alert-danger">Invalid input</div>
    </div>
    
    <div class="form-group">
        <label for="numPersons">Number of persons</label>
        <select class="form-control" id="numPersons">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="timeEstimation">Time estimation</label>
        <select class="form-control" id="timeEstimation">
            <option>Less than 30 minutes</option>
            <option>30 - 60 minutes</option>
            <option>60 - 120 minutes</option>
            <option>More than 120 minutes</option>
        </select>
    </div>
    
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let ingredient of recipe?.ingredients; let i = index">
                    <td>
                        <input type="text"
                               class="form-control form-control-sm"
                               name="ingredient-{{ i }}-name"
                               [(ngModel)]="ingredient.name">
                    </td>
                    <td>
                        <input type="number"
                               class="form-control form-control-sm"
                               name="ingredient-{{ i }}-amount
                               [(ngModel)]="ingredient.amount">
                    </td>
                    <td>
                        <input type="text"
                               class="form-control form-control-sm"
                               name="ingredient-{{ i }}-unit"
                               [(ngModel)]="ingredient.unit">
                    </td>
                    <td>Remove</td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-primary" (click)="addIngredient()">Add ingredient</button>
    </div>
    
    <div class="form-group">
        <label for="instructions">Instructions</label>
        <textarea id="instructions"
                  class="form-control"
                  name="instructions"
                  [(ngModel)]="recipe.instructions"
                  #instructions="ngModel"
                  rows="10"
                  required></textarea>
    </div>
    
    <button class="btn btn-primary" type="submit" [disabled]="!recipeForm.form.valid">Save</button>
    <button class="btn btn-warning" type="button" (click)="toggleEditing()">Cancel</button>
</form>
`
})

export class RecipeDetailEditComponent {
    @Input() recipe: Recipe;
    @Output() recipeChange: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    @Input() successMessage: string;
    @Output() successMessageChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() errorMessage: string;
    @Output() errorMessageChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() isEditing: boolean;
    @Output() isEditingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private recipeService: RecipeService
    ) {
    }

    private updateSuccessMessage(message: string): void {
        this.successMessage = message;
        this.successMessageChange.emit(this.successMessage);
        this.errorMessage = undefined;
        this.errorMessageChange.emit(this.errorMessage);
    }

    private updateErrorMessage(message: string): void {
        this.errorMessage = message;
        this.errorMessageChange.emit(this.errorMessage);
        this.successMessage = undefined;
        this.successMessageChange.emit(this.successMessage);
    }

    private updateRecipe(recipe: Recipe): void {
        this.recipe = recipe;
        this.recipeChange.emit(this.recipe);
    }

    private onSubmit() {
        //noinspection JSUnusedLocalSymbols
        this.recipeService.update(this.recipe)
            .subscribe(
                data => {
                    this.updateSuccessMessage('Successfully saved recipe!');
                    this.updateRecipe(data);
                    this.toggleEditing();
                },
                err => this.updateErrorMessage('Failed to save recipe!')
            );
    }

    private toggleEditing() {
        this.isEditing = false;
        this.isEditingChange.emit(this.isEditing);
    }

    private addIngredient(): void {
        if (this.recipe.ingredients) {
            this.recipe.ingredients.push(new Ingredient(undefined, 1, undefined));
        }
    }
}
