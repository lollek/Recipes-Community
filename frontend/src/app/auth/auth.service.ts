import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {HttpClient} from '../http-client.service';
import {User} from './user.model';
import {AsyncSubject} from "rxjs/AsyncSubject";
import {FacebookService, InitParams, LoginResponse, LoginStatus, AuthResponse} from "ngx-facebook";

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
        this.isLoggedIn = false;
        this.user = undefined;
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
      return this.loginToFacebook().map((data: any) => {
          this.user = data.json() as User;
          this.isLoggedIn = true;
          return this.isLoggedIn;
      });
    }
}
