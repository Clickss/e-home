import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;

import { Maison } from '../../models/maison';
import { MaisonService } from '../../services/maison.service';

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
	
    
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
        private route: ActivatedRoute, private maisonService: MaisonService) {} 
    
    links_maisons: RouteInfo[] = [];

    ngOnInit() {
        this.maisonService.getMaisons()
            .subscribe(maisons => {
                maisons.forEach(maison => {
                   this.links_maisons.push({ path: '/maisons/'+maison.id, title: maison.nom, icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: [] }) 
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
