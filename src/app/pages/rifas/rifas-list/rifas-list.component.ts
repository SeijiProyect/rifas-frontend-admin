import { Component, OnInit } from '@angular/core';

import { RifaService } from '../../../services/rifa.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../common/global.service';
import { PasajeroService } from '../../../services/pasajero.service';
import { SorteoService } from 'src/app/services/sorteo.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogCompradorComponent } from 'src/app/shared/dialog-comprador/dialog-comprador.component';
import { DialogDepositoComponent } from 'src/app/shared/dialog-deposito/dialog-deposito.component';

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'rifas-list',
  templateUrl: './rifas-list.component.html',
  styleUrls: ['./rifas-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class RifasListComponent implements OnInit {
  panelOpenState = false;

  public rifas: any;
  public rifas_select: any[] = [];
  public selectedRifa = 'todos';
  public selectedSorteo = 'todos';
  public sorteos: any[] = [];
  public talones: any;
  public pasajeros: any;
  public pasajero: any;
  public loading: boolean = false;
  public pasajerosLoading: boolean = true;

  // Atributos control paginado
  public aux_lote_talones: any[] = [];
  public loteDatos: number = 0;
  public totalTalones: number = 0;
  public pageTotalRegistros: number = 0;
  public pageRegisterLimit: number = 1000;
  public pageSize = 20;
  public pageIndex = 0;

  public selectedStatus = 'todos';
  public selectedPasajero = 'todos';
  public desdeValue: number | string = '';
  public hastaValue: number | string = '';

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Numero', 'Rifa', 'Sorteos'];
  expandedElement: any | null | undefined;

  constructor(
    private _rifaService: RifaService,
    private _pasajeroService: PasajeroService,
    private _sorteoService: SorteoService,
    public globalService: GlobalService,
    public router: Router,
    public dialogComprador: MatDialog,
    public dialogDeposito: MatDialog,
  ) { }

  async ngOnInit() {
    await this.getRifasActivas();
    await this.getRifas();
    await this.getPasajeros();
  }

  private mostrarPaginado() {
    let desde = this.pageIndex * this.pageSize;
    let hasta = desde + this.pageSize;
    let aux_array_talones: any[] = [];

    let aux_lote_talones = this.aux_lote_talones;
    let nueva_consuta = false;

    if (aux_lote_talones.length > this.pageSize) {
      console.log("Desde: " + desde + " hasta: " + hasta);
      for (let i = desde; i <= hasta; i += 1) {
        if (aux_lote_talones[i] != null) {
          aux_array_talones.push(aux_lote_talones[i]);
        }

        if (aux_lote_talones[i] == null) {
          nueva_consuta = true;
        }

      }

      if (nueva_consuta) {
        // Incremento el lote de datos que viene del servicio
        this.loteDatos++;
        console.log("NUEVA CONSULTA LOTE DE DATOS : " + this.loteDatos);
        this.getRifas();
      }

    } else {
      // console.log("Desde: " + desde + " hasta: " + hasta);
      for (let i = desde; i <= hasta; i += 1) {
        if (aux_lote_talones[i] != null) {
          aux_array_talones.push(aux_lote_talones[i]);
        }
      }

    }

    this.dataSource = aux_array_talones;
    // this.totalTalones = aux_array_talones.length;
    console.log("Talones PAGINADO");
    console.log(aux_array_talones);

  }

  getRifas() {
    //pageRegisterLimit
    this.loading = true;
    this._rifaService
      .getRifasNew(
        this.loteDatos,
        this.pageRegisterLimit,
        this.pageIndex,
        this.selectedStatus,
        this.desdeValue,
        this.hastaValue,
        this.selectedPasajero,
        this.selectedRifa,
        this.selectedSorteo
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          // this.aux_lote_talones = [];
          this.rifas = response.data.rifas;

          for (let item of this.rifas) {
            this.aux_lote_talones.push(item);
          }

          /* console.log('PAGINA FORMATO: ');
           console.log('Index Page: ' + this.pageIndex);
           console.log('Tamano pagina: ' + this.pageSize);
           console.log('Limite registros: ' + this.pageRegisterLimit);*/
          this.totalTalones = response.data.totalTalones;
          this.mostrarPaginado();

        }
        this.loading = false;
      });
  }

  getRifasFilter() {
    this.loading = true;
    this.pageIndex = 0
    this.loteDatos = 0;
    this.aux_lote_talones = [];

    this._rifaService
      .getRifasFilter(
        this.loteDatos,
        this.pageRegisterLimit,
        this.pageIndex,
        this.selectedStatus,
        this.desdeValue,
        this.hastaValue,
        this.selectedPasajero,
        this.selectedRifa,
        this.selectedSorteo,
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {

          this.rifas = response.data.rifas;
          for (let item of this.rifas) {
            this.aux_lote_talones.push(item);
          }

          this.totalTalones = response.data.totalTalones;
          this.mostrarPaginado();

        }
        this.loading = false;
      });
  }

  listaSorteosByRifa(idRifa: number) {
    this._sorteoService.getSorteosByRifaId(idRifa).subscribe((response: any) => {
      let status = response.status;
      // Inicializo la lista de sorteos para el combo box
      this.sorteos = [];

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let sorteos = response.data;
        let sorteoAux;
        for (let sorteo of sorteos) {
          sorteoAux = {
            index: Number(sorteo.id),
            sorteo_id: Number(sorteo.id),
            rifa_id: Number(sorteo.rifa_id),
            sorteo_fecha: sorteo.fechaSorteo,
            sorteo_numero: sorteo.sorteoNumero,
            rifa_nombre: sorteo.rifa_nombre,
            numero_inicial: sorteo.numeroInicialTalon,
            numero_final: sorteo.numeroFinalTalon,
            name: sorteo.sorteoNumero + " - Sorteo: ",
            completed: false,
            checked: false
          }
          this.sorteos.push(sorteoAux);
        }
        //console.log("Lista de sorteos por Rifa");
        //console.log(sorteos);
      }
    });

  }

  getRifasActivas() {
    this._rifaService.getRifasActivas().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let rifas = response.data;
        let rifaAux;
        for (let rifa of rifas) {
          rifaAux = {
            rifa_id: Number(rifa.rifa_id),
            organizador_id: Number(rifa.organizacion_id),
            rifa_nombre: rifa.rifa_nombre,
            rifa_descripcion: rifa.rifa_descripcion,
            rifa_fechaInicio: rifa.rifa_fecha_inicio,
            rifa_fechaFin: rifa.rifa_fecha_fin
          }
          this.rifas_select.push(rifaAux);
        }
      }
    });
  }

  getPasajeros() {
    this.loading = true;
    this._pasajeroService.getPasajerosList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeros = response.data;
      }
      this.loading = false;
      this.pasajerosLoading = false;
    });
  }

  pageEvent(page: any) {
    //this.loading = true;
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    this.pageTotalRegistros = page.length;

    /* console.log("CANTIDAD DE REGISTROS: " + this.pageTotalRegistros);
     console.log("NUMERO DE PAGINA: " + this.pageIndex);
     console.log("TAMANO LIMITE: " + this.pageSize);
     console.log("STATUS: " + this.selectedStatus + " PASAJERO: " + this.selectedPasajero + " DESDE: " + this.desdeValue);*/
    this.mostrarPaginado();

  }

  rifaChange(event: any) {
    this.selectedRifa = event.value;
    //console.log("Rifa seleccionada: " + this.selectedRifa);
    if (this.selectedRifa == 'todos') {
      this.sorteos = [];
    } else {
      this.listaSorteosByRifa(Number(this.selectedRifa));
    }

  }

  sorteoChange(event: any) {
    this.selectedSorteo = event.value;
  }

  statusChange(event: any) {
    this.selectedStatus = event.value;
  }

  pasajeroChange(event: any) {
    this.selectedPasajero = event;
  }

  filter() {
    this.pageIndex = 0;
    this.getRifasFilter();
  }

  datosPasajero(idPersona: any) {
    //console.log("Persona seleccionada: " + obj);
    localStorage.setItem("idPersona", idPersona.toString());
    let id = localStorage.getItem("idPersona");
    this.router.navigate(["/dashboard/personas/persona-tab"]);
    console.log("Id Persona:");
    console.log(idPersona);

  }

  openDialogComprador(idComprador: any) {
    console.log("Comprador seleccionado: " + idComprador);
    localStorage.setItem("idComprador", idComprador.toString());
    let id = localStorage.getItem("idComprador");
    this.dialogComprador.open(DialogCompradorComponent, {
      data: {
        animal: 'panda'
      }
    });

  }

  /*openDialogDeposito(idDeposito: any) {
    //console.log("Persona seleccionada: " + obj);
    localStorage.setItem("idDeposito", idDeposito.toString());
    let id = localStorage.getItem("idDeposito");
    this.dialogDeposito.open(DialogDepositoComponent, {
      data: {
        animal: 'panda'
      }
    });
    //this.router.navigate(["/dashboard/personas/persona-tab"]);
    console.log("Id Deposito:");
    console.log(idDeposito);
  }*/
}
