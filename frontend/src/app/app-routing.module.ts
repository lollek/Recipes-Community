import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {FrontPageComponent} from "./front-page.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {SearchResultsComponent} from "./search-results.component";

const appRoutes: Routes = [
    { path: 'search/:query', component: SearchResultsComponent },
    { path: '', pathMatch: 'full', component: FrontPageComponent },
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
