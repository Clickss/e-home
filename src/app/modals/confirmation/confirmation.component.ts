import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  titre: string;
  texte: string;

  constructor(
    private modalService: NgbActiveModal
  ) { }

  ngOnInit() {
  }
  
  dismiss()
  {
    this.modalService.close();
  }
  
  close(rep: string)
  {
      this.modalService.close(rep);
  }

}
