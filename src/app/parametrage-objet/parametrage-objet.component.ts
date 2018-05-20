import { Component, OnInit } from '@angular/core';
import { ObjetPiece } from '../models/objetpiece';
import { ObjetService } from '../services/objet.service';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParametreService } from '../services/parametre.service';
import { Parametre } from '../models/parametre';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';


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
        private modalService: NgbModal,
        private modalActiveService: NgbActiveModal,
        private parametreService: ParametreService
    ) {
        this.createForm();
    }

    id_maison: string;
    id_etage: string;
    id_piece: string;
    slider: number;
    objetPiece: ObjetPiece;
    parametrageForm: FormGroup;
    parametres: Parametre[];
    new_parametre: Parametre;

  ngOnInit() {
      this.route.paramMap
        .switchMap(params => this.parametreService.getParametres(this.id_maison, this.id_etage, this.id_piece, this.objetPiece.id))
        .subscribe(parametre => {
          this.parametres = parametre
      });
  }
    
  createForm(){
    this.parametrageForm = this.fb.group({
      f_etat: ['', Validators.required],
      f_slider: ['', Validators.required],
      f_heure: ['', Validators.requiredTrue],
      f_jours: ['', Validators.required]
    });
  }
  
  onSliderChange(value){
      this.slider = value.target.value;
  }

  onSubmit(){
    const formModel = this.parametrageForm.value;
    
    var p: Parametre = {
      id:null,
      heure:formModel.f_heure.toString(),
      jour:formModel.f_jours.toString(),
      val_etat:formModel.f_etat,
      val_slider:formModel.f_slider,
      objet_piece:null
    }

    this.new_parametre = this.parametreService.prepareSaveParametrage(p);
    this.parametreService.addParametre(this.id_maison, this.id_etage, this.id_piece, this.objetPiece.id, this.new_parametre).subscribe(
      data => {
        this.parametres.push(data);
      }
    )
  }

  onDeleteParametre(id_parametrage:string){
    const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
    modalRef.componentInstance.titre = "Confirmer la suppression de cet objet ?";
    modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cet objet de votre pièce ?";
    modalRef.result.then(res => {
        if(res == true)
        {
          this.parametreService.deleteParametrage(this.id_maison, this.id_etage, this.id_piece, this.objetPiece.id, id_parametrage).subscribe(data => {
              this.ngOnInit();
          });
        }
    });
  }

  dismiss()
  {
    this.modalActiveService.close();
  }
}
