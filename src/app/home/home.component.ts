import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'ap-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    prenom: string;
    nom: string;

    constructor(private userService: UserService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(user => {
                this.nom = user.nom,
                this.prenom = user.prenom
            });
    }

}