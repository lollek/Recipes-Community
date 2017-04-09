import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {LoginViewComponent} from "./auth/view/login.view.component";
import {HomeViewComponent} from "./home-view.component";
import {PageNotFoundComponent} from "./page-not-found.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginViewComponent },

    { path: '', pathMatch: 'full', component: HomeViewComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
