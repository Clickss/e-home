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
export class ObjetService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getObjets(id_maison: string, id_etage: string, id_piece: string): Observable<ObjetPiece[]> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this.http.get<ObjetPiece[]>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/objets', httpOptions);
    }

    getEtage(id_etage: string): Observable<Etage> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        //return this.http.get<Maison>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage, httpOptions);
        return this.http.get<Etage>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/1/etages/'+id_etage, httpOptions);
    }

    addObjetPiece(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece): Observable<ObjetPiece>{
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        
        return this
            .http
            .post<ObjetPiece>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/objets', objetPiece, httpOptions);
    }
    
    deleteObjetPiece(id_maison: string, id_etage: string, id_piece: string, id_objetpiece: string){
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        
        return this
            .http
            .delete('http://localhost:8000/api/utilisateurs/' + u.id + '/maisons/' + id_maison + '/etages/' + id_etage + '/pieces/' + id_piece + '/objets/' + id_objetpiece, httpOptions)
    }

    prepareSaveObjetPiece(objetPiece: ObjetPiece): ObjetPiece{

        const saveObjetPiece: ObjetPiece = objetPiece
    
        return saveObjetPiece;
    }
}
