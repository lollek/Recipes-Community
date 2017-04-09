import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RecipeService} from "./recipe.service";
import {RecipeListComponent} from "./recipe-list.component";
import {BrowserModule} from "@angular/platform-browser";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {RecipeRoutingModule} from "./recipe-routing.module";


@NgModule({
    declarations: [ RecipeListComponent, RecipeDetailComponent ],
    providers: [ RecipeService ],
    imports: [ BrowserModule, HttpModule, RecipeRoutingModule ],
    exports: [ RecipeListComponent ]
})

export class RecipeModule { }
