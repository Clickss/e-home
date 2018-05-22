import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

import { Maison } from '../../models/maison';
import { MaisonService } from '../../services/maison.service';

import { Etage } from '../../models/etage';
import { EtageService } from '../../services/etage.service';

import { Piece } from '../../models/piece';
import { PieceService } from '../../services/piece.service';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {

    prenom: string;
    nom: string;    
    
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
            
        } else {
            this.showMenu = element; 
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
            
        } else {
            this.showSubMenu = element; 
        }
    }
    
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute, private maisonService: MaisonService,
        private userService: UserService, private etageService: EtageService,
        private pieceService: PieceService
    ) {} 
    
    links_maisons: RouteInfo[] = [];

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(user => {
                this.nom = user.nom,
                this.prenom = user.prenom
            });
            
        this.maisonService.getMaisons()
            .subscribe(maisons => {
                maisons.forEach(maison => {
                
                    // Variable locale pour quelle soit vide à chaque boucle, donc pas de "this"
                    let links_etages: RouteInfo[] = [];
                    
                    this.etageService.getEtages(maison.id)
                        .subscribe(etages => {
                            etages.forEach(etage => {
                                
                                // Variable locale pour quelle soit vide à chaque boucle, donc pas de "this"
                                let links_pieces: RouteInfo[] = [];
                                
                                this.pieceService.getPieces(maison.id, etage.id)
                                    .subscribe(pieces => {
                                        pieces.forEach(piece => {
                                            links_pieces.push({ path: '/maisons/'+maison.id, title: piece.nom, icon: 'mdi mdi-seat-recline-extra', class: '', label: '', labelClass: '', extralink: false, submenu: [] });
                                        });
                                    });
                                
                                links_etages.push({ path: '/maisons/'+maison.id, title: etage.nom, icon: 'mdi mdi-stairs', class: '', label: '', labelClass: '', extralink: false, submenu: links_pieces, id: etage.id });
                            });
                        });
                    
                    this.links_maisons.push({ path: '/maisons/'+maison.id, title: maison.nom, icon: 'mdi mdi-home-variant', class: '', label: '', labelClass: '', extralink: false, submenu: links_etages, id: maison.id });
                });
            });
                
        this.sidebarnavItems = this.links_maisons//ROUTES.filter(sidebarnavItem => sidebarnavItem);
        $(function () {
            $(".sidebartoggler").on('click', function() {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");
                     
                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });
        
    }
  
  putMaison(nom_maison: string): void {
      this.maisonService.putMaison(nom_maison).subscribe(data => {
        this.links_maisons.push({ path: '/maisons/'+data.id, title: data.nom, icon: 'mdi mdi-home-variant', class: '', label: '', labelClass: '', extralink: false, submenu: [], id: data.id });
    });
  }
  
  putEtage(id_maison: string, nom_etage: string): void {
      this.etageService.putEtage(id_maison, nom_etage).subscribe(data => {
        this.links_maisons.find(o => o.path == '/maisons/'+id_maison).submenu.push({ path: '/maisons/'+id_maison, title: data.nom, icon: 'mdi mdi-stairs', class: '', label: '', labelClass: '', extralink: false, submenu: [], id: data.id });
        this.router.ngOnDestroy();
        // this.router.navigate(['/maisons', +id_maison]);
    });
  }
  
  putPiece(id_maison: string, id_etage: string, nom_piece: string): void {
      this.pieceService.putPiece(id_maison, id_etage, nom_piece).subscribe(data => {
        this.links_maisons.find(o => o.path == '/maisons/'+id_maison).submenu.find(o => o.path == '/maisons/'+id_maison).submenu.push({ path: '/maisons/'+id_maison, title: data.nom, icon: 'mdi mdi-seat-recline-extra', class: '', label: '', labelClass: '', extralink: false, submenu: [], id: data.id });
    });
  }

    // inutile mais je laisse au cas où...
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
}
