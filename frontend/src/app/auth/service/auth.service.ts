import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';

import {UserModel} from "../model/user.model";
import {ApplicationConfiguration} from "../../app.config";


@Injectable()
export class AuthenticationService {

    private user: UserModel;

    constructor(
        private http: Http
    ) {
    }

    private setLoggedIn(user: UserModel): void {
        console.log('setLoggedIn');
        this.user = user;
    }

    private setLoggedOut(): void {
        console.log('setLoggedOut');
        this.user = undefined;
    }

    public login(username: string, password: string): Observable<void> {
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${ApplicationConfiguration.API_ENDPOINT}/auth/login`, JSON.stringify({
            username: username,
            password: password
        }), {
            headers: headers
        }).map((response: Response) => {
            if (response.ok) {
                this.setLoggedIn(response.json());
            } else {
                this.setLoggedOut();
            }
        });
    }

}