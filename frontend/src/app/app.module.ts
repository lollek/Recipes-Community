import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {HomeViewComponent} from "./homeView.component";
import {SearchViewComponent} from "./searchView.component";
import {LoginViewComponent} from "./auth/view/login.view.component";
import {AuthModule} from "./auth/auth.module";

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeViewComponent },
    { path: 'search/:query', component: SearchViewComponent },
    { path: 'login', component: LoginViewComponent }
];

@NgModule({
    imports: [
        AuthModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [ AppComponent, HomeViewComponent, SearchViewComponent ],
    bootstrap: [ AppComponent ]
})

export class TDDD27RecipesModule { }
