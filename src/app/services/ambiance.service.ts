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
import { Ambiance } from '../models/ambiance';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 
@Injectable()
export class AmbianceService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    putAmbiance(id_maison: string, id_etage: string, id_piece: string, ambiance: Ambiance): Observable<Ambiance> {
        if (ambiance.nom == "") return;
        
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        
        return this
            .http
            .post<Ambiance>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/ambiances', ambiance, httpOptions);
    }
    
    prepareSaveAmbiance(ambiance: Ambiance): Ambiance{

        const saveAmbiance: Ambiance = ambiance
    
        return saveAmbiance;
    }

    getAmbiance(id_maison: string, id_etage: string, id_piece: string, id_ambiance: string): Observable<Ambiance> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this.http.get<Ambiance>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/ambiances/'+id_ambiance, httpOptions);
    }

    getAmbiances(id_maison: string, id_etage: string, id_piece: string): Observable<Ambiance[]> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this.http.get<Ambiance[]>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/ambiances', httpOptions);
    }

    updateAmbiance(id_maison: string, id_etage: string, id_piece: string, ambiance: Ambiance): Observable<Ambiance> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        console.log(JSON.stringify(ambiance));
        
        return this
            .http
            .post<Ambiance>('http://localhost:8000/api/utilisateurs/' + u.id + '/maisons/' + id_maison + '/etages/' + id_etage + '/pieces/' + id_piece + '/ambiances/' + ambiance.id, ambiance, httpOptions);
    }

    deleteAmbiance(id_maison: string, id_etage: string, id_piece: string, id_ambiance: string){
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));
        
        return this.http.delete('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/ambiances/'+id_ambiance, httpOptions);
    }
}
