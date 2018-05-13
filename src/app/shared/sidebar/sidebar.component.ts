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
        private pieceService: PieceService) {} 
    
    links_maisons: RouteInfo[] = [];
    links_etages: RouteInfo[] = [];
    links_pieces: RouteInfo[] = [];

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
                    
                    this.etageService.getEtages(maison.id)
                        .subscribe(etages => {
                            etages.forEach(etage => {
                                
                                this.pieceService.getPieces(maison.id, etage.id)
                                    .subscribe(pieces => {
                                        pieces.forEach(piece => {
                                            this.links_pieces.push({ path: '/maisons/'+maison.id+'/etages/'+etage.id+'/pieces/'+piece.id, title: piece.nom, icon: 'mdi mdi-seat-recline-extra', class: '', label: '', labelClass: '', extralink: false, submenu: [] });
                                        });
                                    });
                                
                                this.links_etages.push({ path: '/maisons/'+maison.id+'/etages/'+etage.id, title: etage.nom, icon: 'mdi mdi-stairs', class: '', label: '', labelClass: '', extralink: false, submenu: this.links_pieces });
                                //this.links_pieces = [];
                            });
                        });
                    
                    this.links_maisons.push({ path: '/maisons/'+maison.id, title: maison.nom, icon: 'mdi mdi-home-variant', class: '', label: '', labelClass: '', extralink: false, submenu: this.links_etages });
                    //this.links_pieces = [];
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
}
