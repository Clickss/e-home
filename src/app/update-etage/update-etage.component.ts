import { Component, OnInit } from '@angular/core';
import { ObjetPiece } from '../models/objetpiece';
import { Etage } from '../models/etage';
import { ObjetService } from '../services/objet.service';
import { EtageService } from '../services/etage.service';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Event } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';


@Component({
  selector: 'app-update-etage',
  templateUrl: './update-etage.component.html',
  styleUrls: ['./update-etage.component.css']
})
export class UpdateEtageComponent implements OnInit {

  constructor(
        private fb:FormBuilder,
        private route: ActivatedRoute, 
        private router: Router,
        private modalService: NgbModal,
        private modalActiveService: NgbActiveModal,
        private etageService: EtageService  
    ) {
        this.createForm();
    }

    id_maison: string;
    id_etage: string;
    etageForm: FormGroup;
    //parametres: Parametre[];
    new_etage: Etage;
    etage: Etage;

  ngOnInit() {
      this.route.paramMap
        .switchMap(etages => this.etageService.getEtage(this.id_maison, this.id_etage))
        .subscribe(etage => {
          this.etage = etage
      });
  }
    
  createForm(){
    this.etageForm = this.fb.group({
      f_nom_etage: ['', Validators.required]
    });
  }
  
  onNameChange(value){
      this.etage.nom = value;
  }

  onSubmit(){
    const formModel = this.etageForm.value;
    
    var e: Etage = {
      id:null,
      nom:formModel.f_nom_etage,
      pieces: []
    }

    //this.new_etage = this.etageService.prepareSaveEtage(e);
    //this.etageService.addEtage(this.id_maison, this.id_etage, this.new_etage).subscribe(
      //data => {
        //this.etage.push(data);
      //}
    //)
  }

  onDeleteEtage(id_etage:string){
    const modalRef = this.modalService.open(ConfirmationComponent, {size: 'lg'});
    modalRef.componentInstance.titre = "Confirmer la suppression de cet étage ?";
    modalRef.componentInstance.texte = "Êtes-vous sûr de vouloir supprimer cet étage de votre maison ?";
    modalRef.result.then(res => {
        if(res == true)
        {
          this.etageService.deleteEtage(this.id_maison, this.id_etage).subscribe(data => {
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
