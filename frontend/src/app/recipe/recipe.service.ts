import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Recipe} from './recipe.model';
import {HttpClient} from '../http-client.service';
import {User} from "../auth/user.model";

@Injectable()
export class RecipeService {

    constructor(
        private http: HttpClient
    ) {
    }

    public update(recipe: Recipe): Observable<Recipe> {
        return this.http.put(`recipe/${recipe.id}`, recipe)
            .map((response: Response) => response.json() as Recipe);
    }

    public findById(id: number): Observable<Recipe> {
        return this.http.get(`recipe/${id}`)
            .map((response: Response) => response.json() as Recipe);
    }

    public findByTitle(title: string): Observable<Array<Recipe>> {
        return this.http.get(`recipe/search/${title}`)
            .map((response: Response) => response.json() as Array<Recipe>);
    }

    public popular(): Observable<Array<Recipe>> {
        return this.http.get(`recipe/popular`)
            .map((response: Response) => response.json() as Array<Recipe>);
    }

    public newest(): Observable<Array<Recipe>> {
        return this.http.get(`recipe/newest`)
            .map((response: Response) => response.json() as Array<Recipe>);
    }

    public findByAuthor(user: User): Observable<Array<Recipe>> {
        return this.http.get(`recipe/user/${user.id}`)
            .map((response: Response) => response.json() as Array<Recipe>);
    }
}

