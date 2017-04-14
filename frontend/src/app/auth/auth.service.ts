import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import 'rxjs/Rx';

import {ApplicationConfiguration} from "../app.config";

import {User} from "./user.model";


@Injectable()
export class AuthService {
    loginRedirectUrl: string;
    user: User;

    constructor(
        private http: Http
    ) {
    }

    get isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    logout(): void {
        this.user = undefined;
    }

    login(username: string, password: string): Observable<boolean> {
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${ApplicationConfiguration.API_ENDPOINT}/auth/login`, JSON.stringify({
            username: username,
            password: password
        }), {
            headers: headers
        }).map((res: Response) => {
            this.user = res.json() as User;
            return this.isLoggedIn;
        });
    }

}