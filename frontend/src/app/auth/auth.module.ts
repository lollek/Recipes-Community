import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {LoginViewComponent} from "./login.view.component";
import {AuthenticationService} from "./auth.service";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginViewComponent
    ],
    providers: [
        AuthenticationService
    ],
    imports: [
        HttpModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }
