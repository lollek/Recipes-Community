import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'recipe-detail-view',
    template: `
<h2 class="text-center">
    <span>{{ recipe?.title }}</span>
    <button *ngIf="isOwner"
            class="btn btn-info"
            (click)="onEdit()">Edit</button>
</h2>
<h6 class="text-center">Created by {{ recipe?.author?.username }}</h6>

<h3>Ingredients</h3>
<ul>
    <li *ngFor="let ingredient of recipe?.ingredients">{{ ingredient?.name }} {{ ingredient?.amount }} {{ ingredient?.unit }}</li>
</ul>

<h3>Instructions</h3>
<div [innerText]="recipe?.instructions">

</div>
`
})

export class RecipeDetailViewComponent {
    @Input() recipe: Recipe;
    @Input() successMessage: string;
    @Input() errorMessage: string;

    @Input() isEditing: boolean;
    @Output() isEditingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private authService: AuthService
    ) {
    }

    get isOwner(): boolean {
        return this.recipe == null || this.recipe.author == null || this.authService.user.id === this.recipe.author.id;
    }

    private onEdit(): void {
        this.isEditing = true;
        this.isEditingChange.emit(true);
    }
}
