import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {LoginComponent} from "./login.component";
import {AuthGuard} from "./auth-guard.service";
import {AuthService} from "./auth.service";

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
        AuthGuard,
        AuthService
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }