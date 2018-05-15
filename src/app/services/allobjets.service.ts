import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentification.service';
import { User } from '../models/user';
import { Maison } from '../models/maison';
import { Etage } from '../models/etage';
import { Objet } from '../models/objet';
import { ObjetPiece } from '../models/objetpiece';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 
@Injectable()
export class AllObjetService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getAllObjets(): Observable<Objet[]> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this.http.get<Objet[]>('http://localhost:8000/api/objets', httpOptions);
    }

    getOneObjet(id: string): Observable<Objet> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        return this.http.get<Objet>('http://localhost:8000/api/objets/'+id, httpOptions);
    }
}
