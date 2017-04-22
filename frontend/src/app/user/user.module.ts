import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {UserRecipesListComponent} from './user-recipes-list.component';

@NgModule({
    declarations: [
        UserRecipesListComponent
    ],
    providers: [
    ],
    imports: [
        UserRoutingModule
    ]
})

export class UserModule { }

