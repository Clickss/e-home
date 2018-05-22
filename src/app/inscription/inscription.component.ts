import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.createForm();
   }

  inscriptionForm: FormGroup;
  new_utilisateur: User;

  ngOnInit() {
  }

  onSubmit()
  {
    const formModel = this.inscriptionForm.value;
    
    var utilisateur: User = {
      id: null,
      mail: formModel.i_mail,
      nom: formModel.i_nom,
      prenom: formModel.i_prenom,
      mdp: formModel.i_cpwd
    }

    this.new_utilisateur = this.userService.prepareSaveUser(utilisateur);
    this.userService.addUser(this.new_utilisateur).subscribe(
      data => {
        this.router.navigate(['/login']);
      }
    )
  }

  createForm(){
    this.inscriptionForm = this.fb.group({
      i_nom: ['', Validators.required],
      i_prenom: ['', Validators.required],
      i_mail: ['', Validators.required],
      i_pwd: ['', Validators.required],
      i_cpwd: ['', Validators.required]
    },
  {
    validator: this.MatchPassword
  });
  }

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('i_pwd').value; // to get value in input tag
    let confirmPassword = AC.get('i_cpwd').value; // to get value in input tag
     if(password != confirmPassword) {
         AC.get('i_cpwd').setErrors( {MatchPassword: true} )
     } else {
         return null
     }
 }
}
