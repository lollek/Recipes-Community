import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HomeViewComponent} from "./homeView.component";
import {SearchViewComponent} from "./searchView.component";
import {LoginViewComponent} from "./auth/view/login.view.component";
import {AuthModule} from "./auth/auth.module";
import {RecipeListComponent} from "./recipe/recipe-list.component";
import {RecipeModule} from "./recipe/recipe.module";
import {PageNotFoundComponent} from "./page-not-found.component";

const appRoutes: Routes = [
    { path: 'search/:query', component: SearchViewComponent },
    { path: 'login', component: LoginViewComponent },

    { path: '', pathMatch: 'full', component: HomeViewComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        AuthModule,
        RecipeModule,
    ],
    declarations: [ AppComponent, HomeViewComponent, SearchViewComponent, PageNotFoundComponent ],
    bootstrap: [ AppComponent ]
})

export class TDDD27RecipesModule { }
