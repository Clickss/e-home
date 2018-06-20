import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { switchMap } from 'rxjs/operator/switchMap';
import { Piece } from '../../models/piece';
import { PieceService } from '../../services/piece.service';
import { Objet } from '../../models/objet';
import { AllObjetService } from '../../services/allobjets.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ObjetPiece } from '../../models/objetpiece';
import { ObjetService } from '../../services/objet.service';

@Component({
  selector: 'app-addobjet',
  templateUrl: './addobjet.component.html',
  styleUrls: ['./addobjet.component.css']
})
export class AddobjetComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute, 
    private router: Router, 
    private pieceService: PieceService,
    private allObjetService: AllObjetService,
    private objetPieceService: ObjetService,
    private modalService: NgbActiveModal
  ) { 
    this.createForm();
  }

  id_maison: string;
  id_etage: string;
  id_piece: string;
  piece: Piece = {id:null, nom:null, objetpiece: [], ambiances: []};
  objets: Objet[];
  objetForm: FormGroup;
  new_objetPiece: ObjetPiece;

  ngOnInit() {
    this.route.paramMap
        .switchMap(params => this.pieceService.getPiece(this.id_maison, this.id_etage, this.id_piece))
        .subscribe(piece => {
          this.piece = piece
        });

    this.route.paramMap
        .switchMap(params => this.allObjetService.getAllObjets())
        .subscribe(objets => {
          this.objets = objets
        });
  }

  dismiss()
  {
    this.modalService.close();
  }

  onSubmit()
  {
    const formModel = this.objetForm.value;

    this.allObjetService.getOneObjet(formModel.s_objet).subscribe(o => {
      var objetPiece: ObjetPiece = {
        id: null,
        objet: o,
        valeurs_objet: {
            id: null,
            val_etat: "0",
            val_slider: "0"
        },
        programmations: null
      }

      this.new_objetPiece = this.objetPieceService.prepareSaveObjetPiece(objetPiece);
      this.objetPieceService.addObjetPiece(this.id_maison, this.id_etage, this.id_piece, this.new_objetPiece).subscribe(
        data => {
          this.modalService.close(data)
        }
      )
    })   
  }

  createForm(){
    this.objetForm = this.fb.group({
      s_objet: ['', Validators.required]
    });
  }
}
