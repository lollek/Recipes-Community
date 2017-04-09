import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Recipe} from "./recipe.model";
import {ApplicationConfiguration} from "../app.config";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class RecipeService {

    public static API_ENDPOINT: string = `${ApplicationConfiguration.API_ENDPOINT}/recipe`;
    public static HEADERS: Headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http
    ) {
    }

    public update(recipe: Recipe): Observable<Recipe> {
        return this.http.put(`${RecipeService.API_ENDPOINT}/${recipe.id}`, recipe, {
            headers: RecipeService.HEADERS
        }).map((response: Response) => response.json() as Recipe);
    }

    public findById(id: number): Observable<Recipe> {
        return this.http.get(`${RecipeService.API_ENDPOINT}/${id}`, {
            headers: RecipeService.HEADERS
        }).map((response: Response) => response.json() as Recipe);
    }

    public findByTitle(title: string): Observable<Array<Recipe>> {
        return this.http.get(`${RecipeService.API_ENDPOINT}/search/${title}`, {
            headers: RecipeService.HEADERS
        }).map((response: Response) => response.json() as Array<Recipe>);
    }
}

