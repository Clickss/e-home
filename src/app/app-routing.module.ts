import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth_guard';
import { MaisonComponent } from './maison/maison.component';

export const Approutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/accueil', pathMatch: 'full' },
            { path: 'accueil', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
            { path: 'home', component: HomeComponent },
            { path: 'maisons/:id', component: MaisonComponent },
        ],
        canActivate: [AuthGuard]
    },
    
    {
        path: '**',
        redirectTo: '' 
    }
];


