
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RifasListComponent } from './rifas/rifas-list/rifas-list.component';
import { DepositosListComponent } from './depositos/depositos-list/depositos-list.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { PersonasListComponent } from './personas/personas-list/personas-list.component';
import { ProcesadorCsvComponent } from './depositos/procesador-csv/procesador-csv.component';
import { CrearDepositoComponent } from './depositos/crear-deposito/crear-deposito.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { LinksDePagosComponent } from './links-de-pagos/links-de-pagos.component';
import { EditarDepositoComponent } from './depositos/editar-deposito/editar-deposito.component';

import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MaterialModule } from '../material.module';
import {MatChipsModule} from '@angular/material/chips';

import { PersonaTabComponent } from './personas/persona-tab/persona-tab.component';
import { PersonaFormComponent } from './personas/persona-form/persona-form.component';
import { PersonaListViajeComponent } from './personas/persona-list-viaje/persona-list-viaje.component';

import { PasajeroFormComponent } from './pasajeros/pasajero-form/pasajero-form.component';
import { PasajeroListComponent } from './pasajeros/pasajero-list/pasajero-list.component';
import { PasajerosChipsComponent } from './pasajeros/pasajeros-chips/pasajeros-chips.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PasajerosTabComponent } from './pasajeros/pasajeros-tab/pasajeros-tab.component';
import { PasajerosTableFilterComponent } from './pasajeros/pasajeros-table-filter/pasajeros-table-filter.component';
import { EtiquetasCheckboxComponent } from './pasajeros/etiquetas-checkbox/etiquetas-checkbox.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { DineroComponent } from './dinero/dinero.component';
import { AsociarDepoConLinkComponent } from './asociar-depo-con-link/asociar-depo-con-link.component';
import { EliminarCostoDialogComponent } from './eliminar-costo-dialog/eliminar-costo-dialog.component';
import { AgregarCostoDialogComponent } from './agregar-costo-dialog/agregar-costo-dialog.component';
import { RifasTabComponent } from './rifas/rifas-tab/rifas-tab.component';
import { RifasEntregaComponent } from './rifas/rifas-entrega/rifas-entrega.component';
import { RifasCrearComponent } from './rifas/rifas-crear/rifas-crear.component';
import { SorteosComponent } from './sorteos/sorteos.component';
import { SorteosCrearComponent } from './sorteos/sorteos-crear/sorteos-crear.component';
import { PasajerosDialogComponent } from './pasajeros/pasajeros-dialog/pasajeros-dialog.component';
import { SorteosCheckboxComponent } from './sorteos/sorteos-checkbox/sorteos-checkbox.component';
import { SaldosComponent } from './saldos/saldos.component';
import { RifasTableComponent } from './rifas/rifas-table/rifas-table.component';
import { SorteosListComponent } from './sorteos/sorteos-list/sorteos-list.component';
import { DepositosTabComponent } from './depositos/depositos-tab/depositos-tab.component';

import { ViajesTabComponent } from './viajes/viajes-tab/viajes-tab.component';
import { ViajeListComponent } from './viajes/viaje-list/viaje-list.component';
import { ItinerariosListComponent } from './itinerarios/itinerarios-list/itinerarios-list.component';
import { GruposListComponent } from './grupos/grupos-list/grupos-list.component';
import { UniversidadesListComponent } from './universidades/universidades-list/universidades-list.component';
import { ViajesFormInscripcionComponent } from './viajes/viajes-form-inscripcion/viajes-form-inscripcion.component';
import { DialogCambioItinerarioComponent } from './dialog/dialog-cambio-itinerario/dialog-cambio-itinerario.component';
import { ViajesTableComponent } from './viajes/viajes-table/viajes-table.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { DocumentosListPersonaComponent } from './documentos/documentos-list-persona/documentos-list-persona.component';
import { DialogElegirContenidoFormComponent } from './dialog/dialog-elegir-contenido-form/dialog-elegir-contenido-form.component';
import { ItinerariosListByViajeComponent } from './itinerarios/itinerarios-list-by-viaje/itinerarios-list-by-viaje.component';
import { DepositosListPasajeroComponent } from './depositos/depositos-list-pasajero/depositos-list-pasajero.component';
import { DepositosChipsComponent } from './depositos/depositos-chips/depositos-chips.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DefaultComponent,
    RifasListComponent,
    DepositosListComponent,
    CrearDepositoComponent,
    ChangePasswordComponent,
    PersonasListComponent,
    ProcesadorCsvComponent,
    PasajerosComponent,
    LinksDePagosComponent,
    EditarDepositoComponent,
    PersonaTabComponent,
    PersonaFormComponent,
    PasajeroFormComponent,
    PersonaListViajeComponent,
    PasajeroListComponent,
    PasajerosChipsComponent,
    PasajerosTabComponent,
    PasajerosTableFilterComponent,
    EtiquetasCheckboxComponent,
    DineroComponent,
    AsociarDepoConLinkComponent,
    EliminarCostoDialogComponent,
    AgregarCostoDialogComponent,
    RifasTabComponent,
    RifasEntregaComponent,
    RifasCrearComponent,
    SorteosComponent,
    SorteosCrearComponent,
    PasajerosDialogComponent,
    SorteosCheckboxComponent,
    SaldosComponent,
    RifasTableComponent,
    SorteosListComponent,
    DepositosTabComponent,
    ViajesTabComponent,
    ViajeListComponent,
    ItinerariosListComponent,
    GruposListComponent,
    UniversidadesListComponent,
    ViajesFormInscripcionComponent,
    DialogCambioItinerarioComponent,
    ViajesTableComponent,
    DocumentosComponent,
    DocumentosListPersonaComponent,
    DialogElegirContenidoFormComponent,
    ItinerariosListByViajeComponent,
    DepositosListPasajeroComponent,
    DepositosChipsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MaterialModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCardModule,
    RecaptchaModule.forRoot({
      siteKey: '6LdS-MgZAAAAAMRN98PdIODHP27BJGiRHqRAgVga',
    }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PagesModule {}
