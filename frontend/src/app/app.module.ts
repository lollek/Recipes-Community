import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {FrontPageComponent} from "./front-page.component";
import {AuthModule} from "./auth/auth.module";
import {RecipeModule} from "./recipe/recipe.module";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";
import {UserModule} from "./user/user.module";
import {SearchResultsComponent} from "./search-results.component";
import {CookbookPageComponent} from "./cookbook-page.component";
import {LoginPageComponent} from "./login-page.component";

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
        FrontPageComponent,
        PageNotFoundComponent,
        SearchResultsComponent,
        CookbookPageComponent,
        LoginPageComponent
    ],
    bootstrap: [ AppComponent ]
})

export class TDDD27RecipesModule { }
