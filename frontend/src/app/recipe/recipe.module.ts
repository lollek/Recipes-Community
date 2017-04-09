import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RecipeService} from "./recipe.service";
import {RecipeListComponent} from "./recipe-list.component";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [ RecipeListComponent ],
    providers: [ RecipeService ],
    imports: [ BrowserModule, HttpModule ],
    exports: [ RecipeListComponent ]
})

export class RecipeModule { }
