import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatPaginator } from '@angular/material/paginator';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { GlobalService } from 'src/app/common/global.service';

import { Pasajero } from 'src/app/models/pasajero.model';
import { Persona } from 'src/app/models/persona.model';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PasajerosChipsComponent } from './pasajeros-chips/pasajeros-chips.component';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { Itinerario } from 'src/app/models/itinerario.model';

const ELEMENT_DATA: Pasajero[] = [];

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class PasajerosComponent implements OnInit {
  disabled = true;
  porcentaje_saldo: number = 0;
  updateSettingSlider(event: any) {
    this.porcentaje_saldo = event.value;
    //console.log("Valor slider porcentaje saldo: " + this.porcentaje_saldo);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }

  public personaIni: Persona = {
    id: 0, nombres: '', apellidos: '', cedula: '', celular: '', direccion: '', sexo: '', email: ""
  };

  public itinerarioIni: Itinerario = {
    id: 0,
    precio:0
  };

  public pasajeroIni: Pasajero = {
    id: 0, persona: this.personaIni, itinerario: this.itinerarioIni, univesidad: '', estado: '', comentarios: ''
  };

  public pasajeroselect: Pasajero = this.pasajeroIni;
  public pasajero: Pasajero;
  pasajeroList: Pasajero[] = [];
  public pasajeros: any;
  public persona: Persona;

  public status = '';
  public costosExtras: any;
  public costoTotal = 0;

  public viajes: any;
  public itinerarios: any;
  public loading: boolean = false;
  public totalPasajeros: number = 0;
  public pageIndex = 0;
  public selectedSatus = 'todos';
  public selectedViaje = 'todos';
  public selectedItinerario = 'todos';
  public desdeValue: any;
  public hastaValue: any;
  public termino: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Pasajero>;
  @ViewChild(PasajerosChipsComponent) hijo!: PasajerosChipsComponent;
  columnas: string[] = ['Id', 'Nombre', 'Itinerario', 'btnSumar'];
  dataSource = ELEMENT_DATA;
  //dataSource: any;

  constructor(
    private _pasajeroService: PasajeroService,
    private _viajeService: ViajeService,
    private _itinerarioService: ItinerarioService,
    public globalService: GlobalService,
    public router: Router
  ) {

    this.pasajero = {
      id: 0, persona: this.personaIni, itinerario: this.itinerarioIni, univesidad: '', estado: '', comentarios: ''
    };

    this.persona = {
      id: 1, nombres: 'inicial', apellidos: 'inicial', cedula: 'inicial', celular: 'inicial',
      direccion: 'inicial', sexo: 'inicial', email: "inicial"
    };
  }
  /*ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }*/

  async ngOnInit() {
    await this.getViajes();
    await this.getPasajeros();
    await this.getItinerarios();
    this.loading = true;
  }

  announceSortChange(event: any) {
    console.log(event);
  }

  getPasajeros() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._pasajeroService.getPasajeros(this.pageIndex).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: Pasajero;
            this.persona = {
              id: list[i]['persona_id'],
              cedula: '',
              apellidos: list[i]['Apellidos'],
              nombres: list[i]['Nombres'],
            }
            pasajero = {
              id: list[i]['pasajero_id'],
              persona: this.persona,
              itinerario: list[i]['itinerario_nombre'],
              comentarios: '',
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;
    });

  }

  getPasajerosByViaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._pasajeroService.getPasajerosByViaje(this.pageIndex, idViaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: Pasajero;
            this.persona = {
              id: list[i]['persona_id'],
              cedula: '',
              apellidos: list[i]['Apellidos'],
              nombres: list[i]['Nombres'],
            }
            pasajero = {
              id: list[i]['pasajero_id'],
              persona: this.persona,
              itinerario: list[i]['itinerario_nombre'],
              comentarios: '',
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;
    });

    /*this._pasajeroService.getPasajerosSaldosByViaje(idViaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let list = response.data;
        console.log("*** PASAJEROS SALDO POR VIAJE **** ");
        console.log(list);
      }
    });*/

  }

  getPasajerosByItinerario() {
    this.loading = true;
    var idItinerario = Number(this.selectedItinerario);

    this._pasajeroService.getPasajerosByItinerario(this.pageIndex, idItinerario).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: Pasajero;
            this.persona = {
              id: list[i]['persona_id'],
              cedula: '',
              apellidos: list[i]['Apellidos'],
              nombres: list[i]['Nombres'],
            }
            pasajero = {
              id: list[i]['pasajero_id'],
              persona: this.persona,
              itinerario: list[i]['itinerario_nombre'],
              comentarios: '',
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;
    });

  }

  getPasajerosByEstado() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._pasajeroService.getPasajerosByEstado(this.pageIndex, this.selectedSatus).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: Pasajero;
            this.persona = {
              id: list[i]['persona_id'],
              cedula: '',
              apellidos: list[i]['Apellidos'],
              nombres: list[i]['Nombres'],
            }
            pasajero = {
              id: list[i]['pasajero_id'],
              persona: this.persona,
              itinerario: list[i]['itinerario_nombre'],
              comentarios: '',
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;
    });

  }

  getPasajerosByTermino() {
    this.loading = true;

    this._pasajeroService.getPasajerosByTermino(this.pageIndex, this.termino).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: Pasajero;
            this.persona = {
              id: list[i]['persona_id'],
              cedula: '',
              apellidos: list[i]['Apellidos'],
              nombres: list[i]['Nombres'],
            }
            pasajero = {
              id: list[i]['pasajero_id'],
              persona: this.persona,
              itinerario: list[i]['itinerario_nombre'],
              comentarios: '',
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;
    });

  }

  getViajes() {
    this.loading = true;
    this._viajeService.getViajesList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.viajes = response.data;
      }
      this.loading = false;
    });
  }

  getItinerarios() {
    this.loading = true;
    this._itinerarioService.getItinerarios().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.itinerarios = response.data;
      }
      this.loading = false;
    });
  }

  getItinerarioByViaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._itinerarioService.getItinerariosByViaje(idViaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.itinerarios = response.data;
      }
      this.loading = false;
    });

  }

  pageEvent(page: any) {
    console.log("Valor Page INdex: " + this.pageIndex);
    this.pageIndex = page.pageIndex;

    if (this.termino == '' && this.selectedViaje == 'todos' && this.selectedSatus == 'todos') {
      // Sin condiciones de filtro
      this.getPasajeros();

    } else {

      if (this.termino != '' && this.selectedViaje != 'todos' && this.selectedSatus == 'todos') {
        // Contiene las tres condiciones de filtro
        //this.getPasajerosByFilter();

      } else {

        if (this.selectedViaje != 'todos' && this.selectedSatus != 'todos') {
          // filtro por viaje y estado
          //this.getPasajerosByViajeAndEstado();
        } else {
          if (this.selectedViaje != 'todos') {
            // Contiene solo el viaje
            this.getPasajerosByViaje();
            console.log("Filtro por VIAJE");
          }

          if (this.selectedSatus != 'todos') {
            // Contiene solo estado
            this.getPasajerosByEstado();
          }

        }

        if (this.termino != '') {
          // Contiene solo el termino
          this.getPasajerosByTermino();
        }

      }

    }
  }

  statusChange(event: any) {
    this.selectedSatus = event.value;
  }

  viajeChange(event: any) {
    this.selectedViaje = event.value;
    //cambiar combo box itinerario
    //console.log("Valor de seleccion de viaje: " + this.selectedViaje);
    if (this.selectedViaje != 'todos') {
      this.getItinerarioByViaje();
    } else {
      this.selectedItinerario = 'todos';
    }

  }

  itinerarioChange(event: any) {
    this.selectedItinerario = event.value;

  }

  filter() {
    console.log("Viaje seleccionado: " + this.selectedViaje);
    console.log("Termino seleccionado: " + this.termino);
    console.log("Estado seleccionado: " + this.selectedSatus);
    console.log("tinerario seleccionado: " + this.selectedItinerario);

    this.pageIndex = 0;
    // this.paginator.firstPage();

    if (this.termino == '' && this.selectedViaje == 'todos' && this.selectedSatus == 'todos') {
      // Sin condiciones de filtro
      this.getPasajeros();

    } else {

      if (this.termino != '' && this.selectedViaje != 'todos' && this.selectedSatus == 'todos') {
        // Contiene las tres condiciones de filtro
        //this.getPasajerosByFilter();

      } else {

        if (this.selectedViaje != 'todos' && this.selectedSatus != 'todos') {
          // filtro por viaje y estado
          //this.getPasajerosByViajeAndEstado();
        } else {

          if (this.selectedItinerario != 'todos') {
            this.getPasajerosByItinerario();
          } else {
            // Contiene solo el viaje
            this.getPasajerosByViaje();
            console.log("Filtro por VIAJE");
          }

          if (this.selectedSatus != 'todos') {
            // Contiene solo estado
            this.getPasajerosByEstado();
          }

        }

        if (this.termino != '') {
          // Contiene solo el termino
          this.getPasajerosByTermino();
        }

      }

    }

  }

 /* filter2() {

    console.log("FUNCION: FILTRO 2");
    console.log("Viaje seleccionado: " + this.selectedViaje);
    console.log("Porcentaje seleccionado: " + this.porcentaje_saldo);
    console.log("tinerario seleccionado: " + this.selectedItinerario);

    this.pageIndex = 0;
    // this.paginator.firstPage();

    if (this.selectedViaje == 'todos' && this.porcentaje_saldo == 0) {
      // Sin condiciones de filtro
      alert("Debes ingresar una condicion de Filtro!!");
      //this.getPasajeros();
    } else {
      if (this.selectedViaje != 'todos' && this.porcentaje_saldo != 0 && this.selectedItinerario == 'todos') {
        // filtro por viaje y porcentaje
        console.log("Filtro saldos por VIAJE - PORCENTAJE");
        this.getPasajerosSaldosByViajeAndPorcentaje();
      } else {
        // filtro por itinerario
        if (this.selectedItinerario != 'todos') {
          if (this.porcentaje_saldo != 0) {
            console.log("Filtro saldos por ITINERARIO - PORCENTAJE");
            this.getPasajerosSaldosByItinerarioAndPorcentaje();
          } else {
            console.log("Filtro saldos por ITINERARIO");
            this.getPasajerosSaldosByItinerario();
          }
        } else {
            // Contiene solo el viaje
            this.getPasajerosSaldoByViaje();
            console.log("Filtro por VIAJE");
        }
      }
    }

  }*/

  Sumar(obj: Pasajero) {
    console.log("Pasajero seleccionada: " + obj);
    this.pasajero = obj;
    this.hijo.guardar(obj);
  }

  /*getPasajerosSaldosByItinerarioAndPorcentaje() {
    this.loading = true;
    var idItinerario = Number(this.selectedItinerario);
    var porcentaje = Number(this.porcentaje_saldo);

    this._pasajeroService.getPasajerosSaldosByItinerarioAndPorcentaje(idItinerario, porcentaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let list = response.data;
        console.log("*** PASAJEROS SALDO POR VIAJE **** ");
        console.log(list);
      }
    });
    this.loading = false;
  }

  getPasajerosSaldosByViajeAndPorcentaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);
    var porcentaje = Number(this.porcentaje_saldo);

    this._pasajeroService.getPasajerosSaldosByViajeAndPorcentaje(idViaje,porcentaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let list = response.data;
        console.log("*** PASAJEROS SALDO POR VIAJE **** ");
        console.log(list);
      }
    });
  }

  getPasajerosSaldoByViaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._pasajeroService.getPasajerosSaldosByViaje(idViaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let list = response.data;
        console.log("*** PASAJEROS SALDO POR VIAJE **** ");
        console.log(list);
      }
    });
    this.loading = false;
  }

  getPasajerosSaldosByItinerario() {
    this.loading = true;
    var idItinerario = Number(this.selectedItinerario);

    this._pasajeroService.getPasajerosSaldosByItinerario(idItinerario).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let list = response.data;
        console.log("*** PASAJEROS SALDO POR ITINERARIO **** ");
        console.log(list);
      }
    });

  }*/


}

