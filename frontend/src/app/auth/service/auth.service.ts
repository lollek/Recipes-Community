import {Http, Response} from "@angular/http";
import {UserModel} from "../model/user.model";
import {Observable} from "rxjs";

export class AuthenticationService {

    constructor(
        private http: Http
    ) {
    }

    private setLoggedIn(user: UserModel): void {

    }

    private setLoggedOut(): void {

    }

    public login(username: string, password: string): void {
        this.http.post('/api/login', JSON.stringify({
            username: username,
            password: password
        }))
            .toPromise()
            .then((response: Response) => {
                console.log('success', response);
            })
            .catch((reason: any) => {
                console.log('error', reason);
            });
    }

}