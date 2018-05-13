import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { EtageService } from '../services/etage.service';
import { PieceService } from '../services/piece.service';
import { ObjetService } from '../services/objet.service';

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.css']
})
export class MaisonComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private maisonService: MaisonService, 
    private etageService: EtageService, 
    private pieceService: PieceService,
    private objetService: ObjetService,
  ) {
    this.ngOnInit();
  }

  maison: Maison = {id:null, nom:null, etages: []};

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.route.paramMap
        .switchMap(params => this.maisonService.getMaison(params.get('id')))
        .subscribe(maison => {
            this.maison=maison;
            this.etageService.getEtages(maison.id).subscribe(etages => {
              etages.forEach(etage => {
                this.pieceService.getPieces(maison.id, etage.id).subscribe(pieces => {
                  pieces.forEach(piece => {
                    this.objetService.getObjets(maison.id, etage.id, piece.id).subscribe(objets => {
                      piece.objets = objets
                    })
                  })
                  etage.pieces = pieces
                });
              });
              this.maison.etages = etages
            })
        });
  }
  
  getEtage(id: string){
    console.log(id)
  }
}
