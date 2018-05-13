import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.css']
})
export class MaisonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private maisonService: MaisonService) {
    this.ngOnInit();
  }

  maison: Maison = {id:null, nom:null};

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.route.paramMap
        .switchMap(params => this.maisonService.getMaison(params.get('id')))
        .subscribe(maison => {
            this.maison=maison;
        });
  }
}
