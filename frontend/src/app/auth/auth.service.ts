import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncSubject} from "rxjs/AsyncSubject";
import 'rxjs/Rx';
import {FacebookService, InitParams, LoginResponse, LoginStatus, AuthResponse} from "ngx-facebook";

import {HttpClient} from '../http-client.service';
import {User} from './user.model';

@Injectable()
export class AuthService {
    loginRedirectUrl: string;
    isLoggedIn = false;
    user: User;

    constructor(
        private http: HttpClient,
        private facebookService: FacebookService
    ) {
      const initParams: InitParams = {
        appId: '1419044448158239',
        xfbml: true,
        version: 'v2.8'
      };

      this.facebookService.init(initParams);

    }

    logout(): void {
        this.http.post('auth/logout', {});
        this.setLoggedOut();
    }

    private loginToBackend(authResponse: AuthResponse): Observable<User> {
        return this.http.get(`auth/login?token=${authResponse.accessToken}`);
    }

    private loginToFacebook(): Observable<User> {
        const subject: AsyncSubject<User> = new AsyncSubject<User>();

        this.facebookService.getLoginStatus()
            .then((response: LoginStatus) => {
                if (response.status === 'connected') {
                    this.loginToBackend(response.authResponse).subscribe(
                        result => {
                            subject.next(result);
                            subject.complete();
                        },
                        err => {
                            subject.next(null);
                            subject.complete();
                        }
                    );

                } else {
                    this.facebookService.login()
                        .then((response: LoginResponse) => {
                            if (response.status === 'connected') {
                                this.loginToBackend(response.authResponse).subscribe(
                                    result => {
                                        subject.next(result);
                                        subject.complete();
                                    },
                                    err => {
                                        subject.next(null);
                                        subject.complete();
                                    }
                                );
                            }
                        })
                      .catch(() => {
                          subject.next(null);
                          subject.complete();
                      });
                }
            });

        return subject.asObservable();
    }

    login(): Observable<boolean> {
        return this.loginToFacebook()
            .flatMap((data: any) => {
                const jwtToken = data.headers.get('Authorization').substring('Bearer '.length);
                localStorage.setItem('jwtToken', jwtToken);
                return this.me()
            });
    }

    me(): Observable<boolean> {
        return this.http.get('auth/me')
            .map((data: any) => this.setLoggedIn(data.json()));
    }

    private setLoggedOut() {
        localStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
        this.user = undefined;
    }

    private setLoggedIn(user: User) {
        this.user = user;
        this.isLoggedIn = true;
        return this.isLoggedIn;
    }
}
