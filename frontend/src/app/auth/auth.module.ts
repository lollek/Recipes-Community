import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

import {LoginComponent} from "./login.component";
import {AuthService} from "./auth.service";
import {AuthRoutingModule} from "./auth-routing.module";
import {HttpClient} from "../http-client.service";

@NgModule({
    declarations: [
        LoginComponent
    ],
    providers: [
        HttpClient,
        AuthService
    ],
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports: [
        LoginComponent
    ]
})

export class AuthModule { }
