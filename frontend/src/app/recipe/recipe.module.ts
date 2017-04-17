import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {RecipeService} from "./recipe.service";
import {RecipeTableComponent} from "./recipe-table.component";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {RecipeListComponent} from "./recipe-list.component";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeTableComponent,
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
        RecipeListComponent,
        RecipeTableComponent
    ]
})

export class RecipeModule { }
