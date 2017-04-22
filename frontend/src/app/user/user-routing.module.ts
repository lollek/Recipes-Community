import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/auth-guard.service';

import {UserRecipesListComponent} from './user-recipes-list.component';

const userRoutes: Routes = [
    {
        path: 'user/recipes',
        component: UserRecipesListComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    providers: [
        AuthGuard
    ],
    exports: [
        RouterModule
    ]
})

export class UserRoutingModule { }
