import { Component, OnInit } from '@angular/core';
import { ObjetPiece } from '../models/objetpiece';
import { ObjetService } from '../services/objet.service';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParametreService } from '../services/parametre.service';
import { Parametre } from '../models/parametre';


@Component({
  selector: 'app-parametrage-objet',
  templateUrl: './parametrage-objet.component.html',
  styleUrls: ['./parametrage-objet.component.css']
})
export class ParametrageObjetComponent implements OnInit {

  constructor(
        private fb:FormBuilder,
        private route: ActivatedRoute, 
        private router: Router,
        private modalService: NgbActiveModal,
        private parametreService: ParametreService
    ) {
        this.createForm();
    }

    id_maison: string;
    id_etage: string;
    id_piece: string;
    slider: number;
    objetPiece: ObjetPiece;
    objetPieceForm: FormGroup;
    parametres: Parametre[];

  ngOnInit() {
      this.route.paramMap
          .switchMap(params => this.parametreService.getParametres(this.id_maison, this.id_etage, this.id_piece, this.objetPiece.id))
        .subscribe(parametre => {
            this.parametres = parametre
      });
  }
    
  createForm(){
    this.objetPieceForm = this.fb.group({
      //s_objet: ['', Validators.required]
    });
  }
  
  onSliderChange(value){
      this.slider = value.target.value;
  }
}
