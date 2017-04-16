import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {RecipeService} from "./recipe.service";
import {RecipeListComponent} from "./recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {RecipeRoutingModule} from "./recipe-routing.module";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeDetailComponent
    ],
    providers: [
        RecipeService
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RecipeRoutingModule
    ],
    exports: [
        RecipeListComponent
    ]
})

export class RecipeModule { }
