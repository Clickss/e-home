import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentification.service';
import { User } from '../models/user';
import { Maison } from '../models/maison';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 
@Injectable()
export class MaisonService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getMaisons(): Observable<Maison[]> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        return this.http.get<Maison[]>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons', httpOptions);
    }

    getMaison(id_maison: string): Observable<Maison> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        return this.http.get<Maison>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison, httpOptions);
    }
}