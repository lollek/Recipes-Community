import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {HttpClient} from '../http-client.service';
import {User} from './user.model';


@Injectable()
export class AuthService {
    loginRedirectUrl: string;
    isLoggedIn = false;
    user: User;

    constructor(
        private http: HttpClient
    ) {
    }

    logout(): void {
        this.isLoggedIn = false;
        this.user = undefined;
    }

    login(username: string, password: string): Observable<boolean> {
        this.http.authHeader = 'Basic ' + btoa(username + ':' + password);

        return this.http.get('auth/login')
            .map((data: any) => {
                this.user = data.json() as User;
                this.isLoggedIn = true;
                return this.isLoggedIn;
            });
    }

    create(username: string, password: string): Observable<boolean> {
        this.http.authHeader = undefined;

        return this.http.post('auth/create', JSON.stringify({
            username: username,
            password: password
        })).map((data: any) => {
            this.user = data.json() as User;
            this.http.authHeader = 'Basic ' + btoa(username + ':' + password);
            this.isLoggedIn = true;
            return this.isLoggedIn;
        });
    }

}
