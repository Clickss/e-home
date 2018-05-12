import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MaisonService } from '../services/maison.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Maison } from '../models/maison';

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.css']
})
export class MaisonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private maisonService: MaisonService) { }

  maison$: string = null;

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.maisonService.getMaison(id).subscribe(maison => { this.maison$ = maison.nom });

    console.log("lol")
  }
}
