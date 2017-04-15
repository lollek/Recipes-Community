import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';

import {HttpClient} from "../http-client.service";


@Injectable()
export class AuthService {
    loginRedirectUrl: string;
    isLoggedIn: boolean = false;

    constructor(
        private http: HttpClient
    ) {
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    login(username: string, password: string): Observable<boolean> {
        this.http.authHeader = "Basic " + btoa(username + ":" + password);

        return this.http.get('auth/login')
            .map(() => {
                this.isLoggedIn = true;
                return this.isLoggedIn;
            });
    }

    create(username: string, password: string): Observable<boolean> {
        this.http.authHeader = undefined;

        return this.http.post('auth/login', JSON.stringify({
            username: username,
            password: password
        })).map(() => {
            this.http.authHeader = "Basic " + btoa(username + ":" + password);
            this.isLoggedIn = true;
            return this.isLoggedIn;
        });
    }

}