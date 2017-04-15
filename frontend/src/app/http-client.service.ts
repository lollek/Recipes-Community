import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpClient {

    public static API_ENDPOINT = "http://localhost:8080/api";
    public authHeader: string;

    constructor(
        private http: Http
    ) {
    }

    headers(hasContent: boolean): Headers {
        const headers: Headers = new Headers();
        if (hasContent) {
            headers.append('Content-Type', 'application/json');
        }
        if (this.authHeader) {
            headers.append('Authorization', this.authHeader);
        }

        return headers;
    }

    get(url: string): Observable<Response> {
        return this.http.get(`${HttpClient.API_ENDPOINT}/${url}`, { headers: this.headers(false) });
    }

    put(url: string, data: any): Observable<Response> {
        return this.http.put(`${HttpClient.API_ENDPOINT}/${url}`, data, { headers: this.headers(true) });
    }

    post(url: string, data: any): Observable<Response> {
        return this.http.post(`${HttpClient.API_ENDPOINT}/${url}`, data, { headers: this.headers(true) });
    }
}
