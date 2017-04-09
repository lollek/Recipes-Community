import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeViewComponent} from "./homeView.component";
import {AuthModule} from "./auth/auth.module";
import {RecipeModule} from "./recipe/recipe.module";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
    imports: [
        BrowserModule,
        AuthModule,
        RecipeModule,
        AppRoutingModule
    ],
    declarations: [ AppComponent, HomeViewComponent, PageNotFoundComponent ],
    bootstrap: [ AppComponent ]
})

export class TDDD27RecipesModule { }
