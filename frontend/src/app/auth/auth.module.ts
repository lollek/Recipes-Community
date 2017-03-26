import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {LoginViewComponent} from "./view/login.view.component";
import {AuthenticationService} from "./service/auth.service";

@NgModule({
    declarations: [ LoginViewComponent ],
    providers: [ AuthenticationService ],
    imports: [ HttpModule, FormsModule ],
    exports: [ LoginViewComponent ]
})

export class AuthModule { }
