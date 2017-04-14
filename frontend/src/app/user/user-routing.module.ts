import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {UserRecipesListComponent} from "./user-recipes-list.component";

const userRoutes: Routes = [
    { path: 'user/recipes', component: UserRecipesListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class UserRoutingModule { }
