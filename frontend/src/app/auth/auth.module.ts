import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {LoginViewComponent} from "./view/login.view.component";

@NgModule({
    declarations: [ LoginViewComponent ],
    imports: [ FormsModule ],
    exports: [ LoginViewComponent ]
})

export class AuthModule { }
