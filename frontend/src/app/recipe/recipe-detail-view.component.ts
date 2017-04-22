import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';

@Component({
    selector: 'recipe-detail-view',
    template: `
<h2 class="text-center">
    <span>{{ recipe?.title }}</span>
    <button class="btn btn-info" (click)="onEdit()">Edit</button>
</h2>
<h6 class="text-center">Created by {{ recipe?.author }}</h6>
<div class="mx-auto">
</div>
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

    private onEdit(): void {
        this.isEditing = true;
        this.isEditingChange.emit(true);
    }
}
