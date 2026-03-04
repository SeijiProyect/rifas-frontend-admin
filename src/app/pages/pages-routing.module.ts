import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { DefaultComponent } from './default/default.component';
import { RifasListComponent } from './rifas/rifas-list/rifas-list.component';
import { RifasTabComponent } from './rifas/rifas-tab/rifas-tab.component';
import { DepositosListComponent } from './depositos/depositos-list/depositos-list.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { PersonasListComponent } from './personas/personas-list/personas-list.component';
import { ProcesadorCsvComponent } from './depositos/procesador-csv/procesador-csv.component';
import { CrearDepositoComponent } from './depositos/crear-deposito/crear-deposito.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { LinksDePagosComponent } from './links-de-pagos/links-de-pagos.component';
import { EditarDepositoComponent } from './depositos/editar-deposito/editar-deposito.component';
import { PersonaTabComponent } from './personas/persona-tab/persona-tab.component';
import { PasajerosTabComponent } from './pasajeros/pasajeros-tab/pasajeros-tab.component';
import { AsociarDepoConLinkComponent } from './asociar-depo-con-link/asociar-depo-con-link.component';
import { SaldosComponent } from './saldos/saldos.component';
import { DepositosTabComponent } from './depositos/depositos-tab/depositos-tab.component';
import { ViajeListComponent } from './viajes/viaje-list/viaje-list.component';
import { ViajesTabComponent } from './viajes/viajes-tab/viajes-tab.component';
import { ViajesFormInscripcionComponent } from './viajes/viajes-form-inscripcion/viajes-form-inscripcion.component';


const routes: Routes = [
  {
    path: 'formularioInscripcion/:id', 
    component: ViajesFormInscripcionComponent
  },

  {
    path: 'reset/:token',
    component: ChangePasswordComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: RifasListComponent,
      },
      {
        path: 'rifas',
        children: [
          { path: '', component: RifasListComponent },
          { path: 'list', component: RifasListComponent },
          { path: 'rifas-tab', component: RifasTabComponent },
          // { path: '**', redirectTo: '' },
        ],
      },
      {
        path: 'depositos',
        children: [
          { path: '', component: DepositosListComponent },
          { path: 'procesar-csv', component: ProcesadorCsvComponent },
          { path: 'nuevo', component: CrearDepositoComponent },
          { path: 'editar', component: EditarDepositoComponent },
          { path: 'depositos-tab', component: DepositosTabComponent },
          { path: '**', redirectTo: '' },
        ],
      },
      {
        path: 'personas',
        children: [
          { path: '', component: PersonasListComponent },
          { path: 'list', component: PersonasListComponent },
          { path: 'persona-tab', component: PersonaTabComponent },
          { path: 'persona-tab/:id', component: PersonaTabComponent },
        ],
      },

      {
        path: 'pasajeros',
        children: [
          { path: '', component: PasajerosComponent },
          { path: 'list', component: PasajerosComponent },
          { path: 'pasajeros-tab', component: PasajerosTabComponent },
          { path: '**', redirectTo: '' },
        ],
      },
      {
        path: 'viajes',
        children: [
          { path: '', component: ViajeListComponent },
          { path: 'list', component: ViajeListComponent },
          { path: 'viajes-tab', component: ViajesTabComponent },
        ],
      },
      {
        path: 'links',
        children: [
          { path: '', component: LinksDePagosComponent },
          { path: '**', redirectTo: '' },
        ],
      },
      {
        path: 'asociar-depo-con-link',
        children: [
          { path: '', component: AsociarDepoConLinkComponent },
          { path: '**', redirectTo: '' },
        ],
      },
      {
        path: 'saldos',
        children: [
          { path: '', component: SaldosComponent },
          { path: '**', redirectTo: '' },
        ],
      },

      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
