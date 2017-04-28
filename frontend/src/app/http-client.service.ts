import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClient {

    public static API_ENDPOINT = '/api';

    constructor(
        private http: Http
    ) {
    }

    //noinspection JSMethodCanBeStatic
    headers(hasContent: boolean): Headers {
        const headers: Headers = new Headers();
        if (hasContent) {
            headers.append('Content-Type', 'application/json');
        }

        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            headers.append('Authorization', `Bearer ${jwtToken}`);
        }

        return headers;
    }

    get(url: string): Observable<Response> {
        return this.http.get(`${HttpClient.API_ENDPOINT}/${url}`, {
            withCredentials: true,
            headers: this.headers(false)
        });
    }

    put(url: string, data: any): Observable<Response> {
        return this.http.put(`${HttpClient.API_ENDPOINT}/${url}`, data, {
            withCredentials: true,
            headers: this.headers(true)
        });
    }

    post(url: string, data: any): Observable<Response> {
        return this.http.post(`${HttpClient.API_ENDPOINT}/${url}`, data, {
            withCredentials: true,
            headers: this.headers(true)
        });
    }
}
