import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';

import {ApplicationConfiguration} from "../app.config";


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    constructor(
        private http: Http
    ) {
    }

    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do( bool => this.isLoggedIn = bool );
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    public _login(username: string, password: string): Observable<void> {
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${ApplicationConfiguration.API_ENDPOINT}/auth/login`, JSON.stringify({
            username: username,
            password: password
        }), {
            headers: headers
        }).map((res: Response) => { });
    }

}