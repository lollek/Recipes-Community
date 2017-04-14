import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {HomeViewComponent} from "./home-view.component";
import {AuthModule} from "./auth/auth.module";
import {RecipeModule} from "./recipe/recipe.module";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";
import {UserModule} from "./user/user.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AuthModule,
        UserModule,
        RecipeModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeViewComponent,
        PageNotFoundComponent
    ],
    bootstrap: [ AppComponent ]
})

export class TDDD27RecipesModule { }
