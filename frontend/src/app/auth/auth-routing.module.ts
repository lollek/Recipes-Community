import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const authRoutes: Routes = [
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }