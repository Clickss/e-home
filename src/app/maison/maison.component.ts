import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';
import { Ambiance } from '../models/ambiance';
import { ObjetPiece } from '../models/objetpiece';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { EtageService } from '../services/etage.service';
import { PieceService } from '../services/piece.service';
import { ObjetService } from '../services/objet.service';
import { AmbianceService } from '../services/ambiance.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddobjetComponent } from '../objet/add/addobjet.component';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { ParametrageObjetComponent } from '../parametrage-objet/parametrage-objet.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


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
    private ambianceService: AmbianceService,
    private modalService: NgbModal,
    private fb:FormBuilder
  ) {
    this.ngOnInit();
    this.createForm();
  }

  maison: Maison = {id:null, nom:null, etages: []};
  slider: number[] = [];
  ambianceForm: FormGroup;
  new_ambiance: Ambiance;

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
                      piece.objetpiece = objetsPieces;
                      objetsPieces.forEach(objetPiece => {                        
                        this.updatePicture(objetPiece);
                      })
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
    modalRef.result.then(res => {
        var etage;
        this.etageService.getEtage(id_maison, id_etage).subscribe(data => {
            etage = data;
            var piece;
            this.pieceService.getPiece(id_maison, data.id, id_piece).subscribe(data2 => {
                piece = data2;
                this.maison.etages.find(e => e.id == etage.id).pieces.find(p => p.id == piece.id).objetpiece.push(res);
                this.updatePicture(res);
            })
        })
    });
  }

  onSliderChange(objetPiece: ObjetPiece, value)
  {
      
      let val_slider = value.target.value;
      objetPiece.valeurs_objet.val_slider = val_slider;
      
      
      this.updatePicture(objetPiece);
  }
  test(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece, value){
    let val_slider = value.target.value;
    objetPiece.valeurs_objet.val_slider = val_slider;
    this.objetService.updateObjetPiece(id_maison, id_etage, id_piece, objetPiece).subscribe(objetPiece => {
        
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onChangeEtat(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece, value)
  {      
      let val_etat = value.target.checked;

      objetPiece.valeurs_objet.val_etat = val_etat;
      this.objetService.updateObjetPiece(id_maison, id_etage, id_piece, objetPiece).subscribe(objetPiece => {
          
      });
      
      this.updatePicture(objetPiece);
  }
  
  showParametrage(id_maison: string, id_etage: string, id_piece: string, objetPiece: ObjetPiece)
  {
      const modalRef = this.modalService.open(ParametrageObjetComponent, { size: 'lg' });
      modalRef.componentInstance.objetPiece = objetPiece;
      modalRef.componentInstance.id_maison = id_maison;
      modalRef.componentInstance.id_etage = id_etage;
      modalRef.componentInstance.id_piece = id_piece;
  }
  
    updatePicture(objetPiece: ObjetPiece): void {
  
        if (objetPiece.objet.nom == "Lumière" || objetPiece.objet.nom == "Wi-fi"
                || objetPiece.objet.nom == "Musique" || objetPiece.objet.nom == "Volets") {
            if (objetPiece.valeurs_objet.val_etat) {
                if (+objetPiece.valeurs_objet.val_slider < 26) {
                    objetPiece.objet.image = objetPiece.objet.image_min;
                } else if (+objetPiece.valeurs_objet.val_slider < 51 && +objetPiece.valeurs_objet.val_slider > 25) {
                    objetPiece.objet.image = objetPiece.objet.image_med;
                } else if (+objetPiece.valeurs_objet.val_slider < 76 && +objetPiece.valeurs_objet.val_slider > 50) {
                    objetPiece.objet.image = objetPiece.objet.image_on;
                } else if (+objetPiece.valeurs_objet.val_slider > 75) {
                    objetPiece.objet.image = objetPiece.objet.image_max;
                }    
            } else {
                objetPiece.objet.image = objetPiece.objet.image_off;
            }
        } else if (objetPiece.objet.nom == "Chauffage" || objetPiece.objet.nom == "Chaudière - eau") {
            if (objetPiece.valeurs_objet.val_etat) {
                if (+objetPiece.valeurs_objet.val_slider < 1) {
                    objetPiece.objet.image = objetPiece.objet.image_min;
                } else if (+objetPiece.valeurs_objet.val_slider < 21 && +objetPiece.valeurs_objet.val_slider > 0) {
                    objetPiece.objet.image = objetPiece.objet.image_med;
                } else if (+objetPiece.valeurs_objet.val_slider < 41 && +objetPiece.valeurs_objet.val_slider > 20) {
                    objetPiece.objet.image = objetPiece.objet.image_on;
                } else if (+objetPiece.valeurs_objet.val_slider > 40) {
                    objetPiece.objet.image = objetPiece.objet.image_max;
                }
            } else {
                objetPiece.objet.image = objetPiece.objet.image_off;
            }
        }
    }

    deleteMaison(id_maison: string): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
        modalRef.componentInstance.titre = "Confirmer la suppression de cette maison ?";
        modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cette maison ?";
        modalRef.result.then(res => {
            if(res == true)
            {
              this.maisonService.deleteMaison(id_maison).subscribe(data => {
                  this.ngOnInit();
              });
            }
        });
    }

    deleteEtage(id_maison: string, id_etage: string): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
        modalRef.componentInstance.titre = "Confirmer la suppression de cet étage ?";
        modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cet étage de votre maison ?";
        modalRef.result.then(res => {
            if(res == true)
            {
              this.etageService.deleteEtage(id_maison, id_etage).subscribe(data => {
                  this.ngOnInit();
              });
            }
        });
    }
            
    deletePiece(id_maison: string, id_etage: string, id_piece: string) : void {
        const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
        modalRef.componentInstance.titre = "Confirmer la suppression de cet pièce ?";
        modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cette pièce de votre étage ?";
        modalRef.result.then(res => {
            if(res == true)
            {
              this.pieceService.deletePiece(id_maison, id_etage, id_piece).subscribe(data => {
                  this.ngOnInit();
              });
            }
        });
    }
    
    putAmbiance(id_maison: string, id_etage: string, id_piece: string) : void {
        const formModel = this.ambianceForm.value;

        this.pieceService.getPiece(id_maison, id_etage, id_piece).subscribe(p => {
            this.objetService.getObjets(id_maison, id_etage, id_piece).subscribe(o => {
                var ambiance: Ambiance = {
                    id: null,
                    nom: this.ambianceForm.value.s_nom,
                    piece: p,
                    ambiance: JSON.stringify(o)
                }
                
                this.new_ambiance = this.ambianceService.prepareSaveAmbiance(ambiance);
                this.ambianceService.putAmbiance(id_maison, id_etage, id_piece, this.new_ambiance).subscribe(
                  data => {
                      var pp = this.maison.etages.find(e => e.id == id_etage).pieces.find(p => p.id == id_piece)
                    pp.ambiances.push(data);
                  }
                ) 
            })
        });
    }
    
    createForm(){
        this.ambianceForm = this.fb.group({
          s_nom: ['', Validators.required]
        });
    }
}
