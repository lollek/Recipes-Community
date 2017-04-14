import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

import {LoginComponent} from "./login.component";
import {AuthService} from "./auth.service";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService
    ],
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }
