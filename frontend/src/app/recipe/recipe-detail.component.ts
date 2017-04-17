import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe.model";

@Component({
    selector: 'recipe-detail',
    template: `
<div *ngIf="successMessage" class="alert alert-success" [innerText]="successMessage"></div>
<div *ngIf="errorMessage" class="alert alert-danger" [innerText]="errorMessage"></div>
<div *ngIf="isEditing">
    <recipe-detail-edit [(recipe)]="recipe"
                        [(successMessage)]="successMessage"
                        [(errorMessage)]="errorMessage"
                        [(isEditing)]="isEditing"></recipe-detail-edit>
</div>
<div *ngIf="!isEditing">
    <recipe-detail-view [recipe]="recipe"
                        [successMessage]="successMessage"
                        [errorMessage]="errorMessage"
                        [(isEditing)]="isEditing"></recipe-detail-view>
</div>
`
})

export class RecipeDetailComponent {
    recipe: Recipe;
    successMessage: string;
    errorMessage: string;
    isEditing: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private service: RecipeService
    ) {
    }

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
}
