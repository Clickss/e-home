import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentification.service';
import { User } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 
@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getUser(): Observable<User> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        let u = JSON.parse(localStorage.getItem("currentUser"));

        // get users from api
        return this.http.get<User>('http://localhost:8000/api/utilisateurs/'+u.id, httpOptions);
    }

    addUser(user: User): Observable<User> {
        // add authorization header with jwt token
        let headers = new Headers();
        httpOptions.headers.append('Authorization', 'Bearer ' + this.authenticationService.token)

        // get users from api
        return this.http.post<User>('http://localhost:8000/api/utilisateurs', user, httpOptions);
    }

    prepareSaveUser(user: User): User{

        const saveUser: User = user
    
        return saveUser;
    }
}