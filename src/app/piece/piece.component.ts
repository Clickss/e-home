import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PieceService } from '../services/piece.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Piece } from '../models/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private pieceService: PieceService) { }

  piece$: string = null;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    //this.pieceService.getPiece(id).subscribe(piece => { this.piece$ = piece.nom });

    console.log("lol")
  }
}
