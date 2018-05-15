import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth_guard';
import { AuthenticationService } from './services/authentification.service';
import { UserService } from './services/user.service';
import { MaisonService } from './services/maison.service';
import { EtageService } from './services/etage.service';
import { PieceService } from './services/piece.service';
import { HomeComponent } from './home/home.component';
import { MaisonComponent } from './maison/maison.component';
import { EtageComponent } from './etage/etage.component';
import { PieceComponent } from './piece/piece.component';
import { ObjetService } from './services/objet.service';
import { AllObjetService } from './services/allobjets.service';
import { AddobjetComponent } from './objet/add/addobjet.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,

    LoginComponent,
    HomeComponent,
    MaisonComponent,
    EtageComponent,
    PieceComponent,
    AddobjetComponent
  ],
  entryComponents: [
    AddobjetComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,   
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),  
    PerfectScrollbarModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    EtageService,
    PieceService,
    MaisonService,
    ObjetService,
    AllObjetService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
