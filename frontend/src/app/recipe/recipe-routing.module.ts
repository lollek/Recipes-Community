import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeDetailComponent} from './recipe-detail.component';
import {AuthGuard} from "../auth/auth-guard.service";

const recipeRoutes: Routes = [
    { path: 'recipes/new', canActivate: [ AuthGuard ], component: RecipeDetailComponent },
    { path: 'recipes/:id', component: RecipeDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    providers: [
        AuthGuard
    ],
    exports: [
        RouterModule
    ]
})

export class RecipeRoutingModule { }
