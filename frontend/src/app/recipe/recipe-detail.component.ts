import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe.model";

@Component({
    selector: 'recipe-detail',
    template: `
<div *ngIf="successMessage" class="alert alert-success" [innerText]="successMessage"></div>
<div *ngIf="errorMessage" class="alert alert-danger" [innerText]="errorMessage"></div>
<div *ngIf="!isEditing">
    <h2 class="text-center">
        <span>{{ recipe?.title }}</span>
        <button class="btn btn-info" (click)="onEdit()">Edit</button>
    </h2>
    <h6 class="text-center">Created by {{ recipe?.author }}</h6>
    <div class="mx-auto">
    </div>
    <div [innerText]="recipe?.instructions">
    
    </div>
</div>

<form *ngIf="isEditing" #recipeForm="ngForm" (ngSubmit)="onSubmit()">
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
    <button class="btn btn-warning" (click)="onCancel()">Cancel</button>
</form>


`
})

export class RecipeDetailComponent {

    recipe: Recipe;
    isEditing: boolean = false;
    successMessage: string;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private service: RecipeService
    ) {
    }

    //noinspection JSUnusedLocalSymbols
    private ngOnInit() {
        //noinspection JSUnusedLocalSymbols
        this.route.params
            .switchMap((params: Params) => this.service.findById(+params['id']))
            .subscribe(
                data => this.recipe = data,
                err => {
                    this.successMessage = undefined;
                    this.errorMessage = 'Failed to load recipe!';
                }
            );
    }

    private onEdit() {
        this.isEditing = true;
    }

    private onSubmit() {
        //noinspection JSUnusedLocalSymbols
        this.service.update(this.recipe)
            .subscribe(
                data => {
                    this.successMessage = 'Successfully saved recipe!';
                    this.errorMessage = undefined;
                    this.recipe = data;
                    this.isEditing = false;
                },
                err => {
                    this.successMessage = undefined;
                    this.errorMessage = 'Failed to save recipe!';
                }
            );
}

    private onCancel() {
        this.isEditing = false;
    }
}
