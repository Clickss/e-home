import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { EtageService } from '../services/etage.service';
import { PieceService } from '../services/piece.service';
import { ObjetService } from '../services/objet.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddobjetComponent } from '../objet/add/addobjet.component';


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
    private modalService: NgbModal
  ) {
    this.ngOnInit();
  }

  maison: Maison = {id:null, nom:null, etages: []};

  ngOnInit(){
    this.route.paramMap
        .switchMap(params => this.maisonService.getMaison(params.get('id')))
        .subscribe(maison => {
            this.maison=maison;
            this.etageService.getEtages(maison.id).subscribe(etages => {
              etages.forEach(etage => {
                this.pieceService.getPieces(maison.id, etage.id).subscribe(pieces => {
                  pieces.forEach(piece => {
                    this.objetService.getObjets(maison.id, etage.id, piece.id).subscribe(objetsPieces => {
                      piece.objetpiece = objetsPieces
                    })
                  })
                  etage.pieces = pieces
                });
              });
              this.maison.etages = etages
            })
        });
  }
  
  deleteObjet(id_objetpiece: string): void{
    console.log("SUPPRESSION :" + id_objetpiece)
  }

  addObjetPiece(id_maison: string, id_etage: string, id_piece: string): void {
    console.log("PIECE : "+id_piece);
    const modalRef = this.modalService.open(AddobjetComponent, { size: 'lg' });
    modalRef.componentInstance.id_maison = id_maison
    modalRef.componentInstance.id_etage = id_etage
    modalRef.componentInstance.id_piece = id_piece
  }
}
