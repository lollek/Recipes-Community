import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {HttpClient} from '../http-client.service';
import {User} from './user.model';

declare const FB: any;

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

    login(): Observable<boolean> {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log('Logged in.', response);
        }
        else {
          FB.login(function(response) {
            console.log('Logged in 2.');
          });
        }
      });
      return Observable.of(true);
    }
}
