import {Component, Input, Output, EventEmitter} from "@angular/core";

import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

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
    </div>
    <div *ngIf="title.errors && (title.dirty || title.touched)"
         class="alert alert-danger">
         <div [hidden]="!title.errors.required">
            Title is required
        </div>
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
    <div *ngIf="instructions.errors && (instructions.dirty || instructions.touched)"
         class="alert alert-danger">
         <div [hidden]="!instructions.errors.required">
            Instructions are required
        </div>
    </div>
    
    <button class="btn btn-primary" type="submit" [disabled]="!recipeForm.form.valid">Save</button>
    <button class="btn btn-warning" (click)="toggleEditing()">Cancel</button>
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
}
