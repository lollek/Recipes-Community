import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {LoginViewComponent} from "./loginView.component";

@NgModule({
    imports: [ FormsModule ],
    exports: [ LoginViewComponent ],
    declarations: [ LoginViewComponent ],
})

export class LoginModule { }
