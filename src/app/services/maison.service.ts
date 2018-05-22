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
        let headers = new Headers({ 'Content-Type': 'text/plain' }); // ... Set content type to JSON
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Methods', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', "*");
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        return this.http.get<Maison>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison, httpOptions);
    }
            
    putMaison(nom_maison: string): Observable<Maison> {
        if (nom_maison == "") return;
        
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        let maison = new Maison();
        maison.nom = nom_maison;
        
        return this.http.post<Maison>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons', maison, httpOptions);
    }
            
    deleteMaison(id_maison: string) {        
        // add authorization header with jwt token
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Methods', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', "*");
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        
        return this.http.delete('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison, httpOptions);
    }
}