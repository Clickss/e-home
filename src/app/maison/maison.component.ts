import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';
import { ObjetPiece } from '../models/objetpiece';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { EtageService } from '../services/etage.service';
import { PieceService } from '../services/piece.service';
import { ObjetService } from '../services/objet.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddobjetComponent } from '../objet/add/addobjet.component';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { ParametrageObjetComponent } from '../parametrage-objet/parametrage-objet.component';


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
  slider: number[] = [];

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
  
  deleteObjet(id_maison: string, id_etage: string, id_piece: string, id_objetpiece: string): void{
      const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
      modalRef.componentInstance.titre = "Confirmer la suppression de cet objet ?";
      modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cet objet de votre pièce ?";
      modalRef.result.then(res => {
          if(res == true)
          {
            this.objetService.deleteObjetPiece(id_maison, id_etage, id_piece, id_objetpiece).subscribe(data => {
                this.ngOnInit();
            });
          }
      });
  }

  addObjetPiece(id_maison: string, id_etage: string, id_piece: string): void {
    const modalRef = this.modalService.open(AddobjetComponent, { size: 'lg' });
    modalRef.componentInstance.id_maison = id_maison
    modalRef.componentInstance.id_etage = id_etage
    modalRef.componentInstance.id_piece = id_piece
  }

  onSliderChange(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece, value, idx:number)
  {
      let val_slider = value.target.value;
      this.slider[idx] = val_slider;
      objetPiece.valeurs_objet.val_slider = val_slider;
      this.objetService.updateObjetPiece(id_maison, id_etage, id_piece, objetPiece).subscribe(objetPiece => {
          
      });
  }

  onChangeEtat(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece, value)
  {
      let val_etat = value.target.checked;

      objetPiece.valeurs_objet.val_etat = val_etat;
      this.objetService.updateObjetPiece(id_maison, id_etage, id_piece, objetPiece).subscribe(objetPiece => {
          
      });
  }
  
  showParametrage(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece)
  {
      const modalRef = this.modalService.open(ParametrageObjetComponent, { size: 'lg' });
      modalRef.componentInstance.objetPiece = objetPiece;
      modalRef.componentInstance.id_maison = id_maison;
      modalRef.componentInstance.id_etage = id_etage;
      modalRef.componentInstance.id_piece = id_piece;
  }
}
