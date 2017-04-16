import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {FrontPageComponent} from "./front-page.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {SearchResultsComponent} from "./search-results.component";
import {CookbookPageComponent} from "./cookbook-page.component";
import {LoginPageComponent} from "./login-page.component";
import {AuthGuard} from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: 'search/:query', component: SearchResultsComponent },
    { path: 'cookbook', canActivate: [ AuthGuard ], component: CookbookPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: '', pathMatch: 'full', component: FrontPageComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        AuthGuard
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
