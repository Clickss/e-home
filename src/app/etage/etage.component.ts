import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EtageService } from '../services/etage.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Etage } from '../models/etage';

@Component({
  selector: 'app-etage',
  templateUrl: './etage.component.html',
  styleUrls: ['./etage.component.css']
})
export class EtageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private etageService: EtageService) { }

  etage$: string = null;

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    this.etageService.getEtage(id).subscribe(etage => { this.etage$ = etage.nom });

    console.log("lol")
  }
}
