import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeListComponent} from "./recipe-list.component";

const recipeRoutes: Routes = [
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/:id', component: RecipeListComponent }
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