import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {HttpClient} from '../http-client.service';

const authRoutes: Routes = [
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
