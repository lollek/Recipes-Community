import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeDetailComponent} from "./recipe-detail.component";

const recipeRoutes: Routes = [
    { path: 'recipes/:id', component: RecipeDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RecipeRoutingModule { }