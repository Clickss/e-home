import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentification.service';
import { Parametre } from '../models/parametre';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 
@Injectable()
export class ParametreService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getParametres(id_maison: string, id_etage: string, id_piece: string, id_objet: string): Observable<Parametre[]> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        return this.http.get<Parametre[]>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/objets/'+id_objet+"/programmations", httpOptions);
    }

    addParametre(id_maison: string, id_etage: string, id_piece: string, id_objet: string, parametre: Parametre): Observable<Parametre>{
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this
            .http
            .post<Parametre>('http://localhost:8000/api/utilisateurs/'+u.id+'/maisons/'+id_maison+'/etages/'+id_etage+'/pieces/'+id_piece+'/objets/'+id_objet+'/programmations', parametre, httpOptions);
    }

    deleteParametrage(id_maison: string, id_etage: string, id_piece: string, id_objetpiece: string, id_parametrage: string){
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)
        
        let u = JSON.parse(localStorage.getItem("currentUser"));

        return this
            .http
            .delete('http://localhost:8000/api/utilisateurs/' + u.id + '/maisons/' + id_maison + '/etages/' + id_etage + '/pieces/' + id_piece + '/objets/' + id_objetpiece + '/programmations/' + id_parametrage, httpOptions)
    }

    prepareSaveParametrage(parametre: Parametre): Parametre{

        const saveParametre: Parametre = parametre
    
        return saveParametre;
    }
}
