import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {LoginComponent} from "./login.component";
import {AuthGuard} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import {HttpClient} from "../http-client.service";

const authRoutes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    providers: [
        HttpClient,
        AuthGuard,
        AuthService
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }